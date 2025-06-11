
import React, { useState, useMemo, useRef, useCallback } from 'react';
import { format, addDays, startOfWeek, isSameDay, parseISO } from 'date-fns';
import { FixedSizeList as List } from 'react-window';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { 
  Clock, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Users,
  Filter
} from 'lucide-react';

interface VirtualizedWeekSchedulerProps {
  caregivers: any[];
  scheduledVisits: any[];
  selectedWeek: Date;
  onVisitMove: (visitId: string, newCaregiverId: string, newTimeSlot: string) => void;
  onVisitSelect: (visit: any) => void;
  onVisitAssign: (visitData: any) => void;
  onSlotClick: (caregiverId: string, caregiverName: string, date: string, time: string) => void;
}

const VirtualizedWeekScheduler: React.FC<VirtualizedWeekSchedulerProps> = ({
  caregivers,
  scheduledVisits,
  selectedWeek,
  onVisitMove,
  onVisitSelect,
  onVisitAssign,
  onSlotClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [groupByRegion, setGroupByRegion] = useState(false);
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());
  const [collapsedCaregivers, setCollapsedCaregivers] = useState<Set<string>>(new Set());

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const filteredCaregivers = useMemo(() => {
    return caregivers.filter(caregiver => {
      const matchesSearch = caregiver.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === 'all' || caregiver.region === regionFilter;
      const matchesRole = roleFilter === 'all' || caregiver.role === roleFilter;
      return matchesSearch && matchesRegion && matchesRole;
    });
  }, [caregivers, searchTerm, regionFilter, roleFilter]);

  const groupedCaregivers = useMemo(() => {
    if (!groupByRegion) {
      return { ungrouped: filteredCaregivers };
    }
    
    const grouped = filteredCaregivers.reduce((acc: Record<string, any[]>, caregiver) => {
      const region = caregiver.region || 'Unassigned';
      if (!acc[region]) acc[region] = [];
      acc[region].push(caregiver);
      return acc;
    }, {} as Record<string, any[]>);
    
    return grouped;
  }, [filteredCaregivers, groupByRegion]);

  const flattenedData = useMemo(() => {
    const data: any[] = [];
    
    if (groupByRegion) {
      Object.entries(groupedCaregivers).forEach(([region, regionCaregivers]: [string, any[]]) => {
        data.push({ type: 'region', region, count: regionCaregivers.length });
        if (expandedRegions.has(region)) {
          regionCaregivers.forEach(caregiver => {
            const hasVisits = scheduledVisits.some(visit => visit.caregiverId === caregiver.id);
            if (!collapsedCaregivers.has(caregiver.id) || hasVisits) {
              data.push({ type: 'caregiver', caregiver });
            }
          });
        }
      });
    } else {
      filteredCaregivers.forEach(caregiver => {
        const hasVisits = scheduledVisits.some(visit => visit.caregiverId === caregiver.id);
        if (!collapsedCaregivers.has(caregiver.id) || hasVisits) {
          data.push({ type: 'caregiver', caregiver });
        }
      });
    }
    
    return data;
  }, [groupedCaregivers, groupByRegion, expandedRegions, collapsedCaregivers, scheduledVisits]);

  const getVisitsForSlot = (caregiverId: string, date: Date, time: string) => {
    return scheduledVisits.filter(visit => {
      const visitDate = parseISO(visit.date);
      return visit.caregiverId === caregiverId &&
             isSameDay(visitDate, date) &&
             visit.startTime === time;
    });
  };

  const handleSlotClick = (caregiverId: string, caregiverName: string, date: Date, time: string) => {
    const visits = getVisitsForSlot(caregiverId, date, time);
    if (visits.length === 0) {
      onSlotClick(caregiverId, caregiverName, format(date, 'yyyy-MM-dd'), time);
    }
  };

  const handleVisitClick = (visit: any) => {
    onVisitSelect(visit);
  };

  const toggleRegion = (region: string) => {
    const newExpanded = new Set(expandedRegions);
    if (newExpanded.has(region)) {
      newExpanded.delete(region);
    } else {
      newExpanded.add(region);
    }
    setExpandedRegions(newExpanded);
  };

  const toggleCaregiverCollapse = (caregiverId: string) => {
    const newCollapsed = new Set(collapsedCaregivers);
    if (newCollapsed.has(caregiverId)) {
      newCollapsed.delete(caregiverId);
    } else {
      newCollapsed.add(caregiverId);
    }
    setCollapsedCaregivers(newCollapsed);
  };

  const regions = Array.from(new Set(caregivers.map(c => c.region)));
  const roles = Array.from(new Set(caregivers.map(c => c.role)));

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = flattenedData[index];
    
    if (item.type === 'region') {
      return (
        <div style={style} className="border-b bg-muted/50">
          <button
            onClick={() => toggleRegion(item.region)}
            className="w-full p-3 flex items-center gap-2 hover:bg-muted/70 transition-colors"
          >
            {expandedRegions.has(item.region) ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <Users className="w-4 h-4" />
            <span className="font-medium">{item.region} Region</span>
            <Badge variant="secondary" className="ml-auto">
              {item.count}
            </Badge>
          </button>
        </div>
      );
    }

    const { caregiver } = item;
    const hasVisits = scheduledVisits.some(visit => visit.caregiverId === caregiver.id);
    
    return (
      <div style={style} className="border-b">
        <div className="grid grid-cols-8">
          <div className="p-3 border-r bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium">
                  {caregiver.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{caregiver.name}</div>
                <div className="text-xs text-muted-foreground">{caregiver.role}</div>
              </div>
              {!hasVisits && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCaregiverCollapse(caregiver.id)}
                  className="opacity-50 hover:opacity-100"
                >
                  <ChevronDown className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
          
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="border-r min-h-[80px]">
              <div className="p-1 space-y-1">
                {timeSlots.map((time) => {
                  const visits = getVisitsForSlot(caregiver.id, day, time);
                  const isEmpty = visits.length === 0;
                  
                  return (
                    <div
                      key={time}
                      className={`min-h-[24px] rounded p-1 text-xs cursor-pointer transition-colors ${
                        visits.length > 0
                          ? 'bg-primary/10 hover:bg-primary/20'
                          : 'hover:bg-muted/50 border border-dashed border-muted-foreground/20 bg-muted/10'
                      }`}
                      onClick={() => {
                        if (visits.length > 0) {
                          handleVisitClick(visits[0]);
                        } else {
                          handleSlotClick(caregiver.id, caregiver.name, day, time);
                        }
                      }}
                    >
                      {visits.length > 0 ? (
                        <div className="space-y-1">
                          {visits.map((visit) => (
                            <div key={visit.id} className="bg-background rounded p-1 shadow-sm">
                              <div className="font-medium truncate">{visit.patientName}</div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{visit.startTime}</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {visit.serviceType}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-muted-foreground/60 text-center">
                          {time}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="flex-1 overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Enhanced Week Scheduler
        </CardTitle>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search caregivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map(role => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant={groupByRegion ? "default" : "outline"}
            size="sm"
            onClick={() => setGroupByRegion(!groupByRegion)}
          >
            <Users className="w-4 h-4 mr-2" />
            Group by Region
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[calc(100vh-300px)]">
          <div className="min-w-[800px]">
            {/* Sticky Header */}
            <div className="grid grid-cols-8 border-b sticky top-0 bg-background z-10 shadow-sm">
              <div className="p-3 border-r bg-muted/50 font-medium">
                Caregiver ({flattenedData.filter(item => item.type === 'caregiver').length})
              </div>
              {weekDays.map((day) => (
                <div key={day.toISOString()} className="p-3 border-r bg-muted/50 text-center">
                  <div className="font-medium">{format(day, 'EEE')}</div>
                  <div className="text-sm text-muted-foreground">{format(day, 'MMM d')}</div>
                </div>
              ))}
            </div>

            {/* Virtualized Rows */}
            <List
              height={Math.min(600, flattenedData.length * 90)}
              itemCount={flattenedData.length}
              itemSize={flattenedData[0]?.type === 'region' ? 60 : 90}
              width="100%"
            >
              {Row}
            </List>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualizedWeekScheduler;
