import React, { useState, useMemo, useRef, useCallback } from 'react';
import { format, addDays, startOfWeek, isSameDay, parseISO } from 'date-fns';
import { VariableSizeList as List } from 'react-window';
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

  // Function to get item size for VariableSizeList
  const getItemSize = useCallback((index: number) => {
    const item = flattenedData[index];
    return item?.type === 'region' ? 70 : 140;
  }, [flattenedData]);

  const getVisitsForSlot = (caregiverId: string, date: Date, time: string) => {
    return scheduledVisits.filter(visit => {
      const visitDate = parseISO(visit.date);
      return visit.caregiverId === caregiverId &&
             isSameDay(visitDate, date) &&
             visit.startTime === time;
    });
  };

  const getCaregiverWorkload = (caregiverId: string) => {
    const caregiverVisits = scheduledVisits.filter(visit => visit.caregiverId === caregiverId);
    const assignedHours = caregiverVisits.reduce((total, visit) => total + (visit.duration || 60) / 60, 0);
    const caregiver = caregivers.find(c => c.id === caregiverId);
    const maxHours = caregiver?.maxHours || 40;
    return { assignedHours: Math.round(assignedHours), maxHours };
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
        <div style={style} className="border-b bg-muted/30 shadow-sm">
          <button
            onClick={() => toggleRegion(item.region)}
            className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors rounded-lg mx-2 my-1"
          >
            {expandedRegions.has(item.region) ? (
              <ChevronDown className="w-4 h-4 text-primary" />
            ) : (
              <ChevronRight className="w-4 h-4 text-primary" />
            )}
            <Users className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">{item.region} Region</span>
            <Badge variant="secondary" className="ml-auto">
              {item.count} caregivers
            </Badge>
          </button>
        </div>
      );
    }

    const { caregiver } = item;
    const hasVisits = scheduledVisits.some(visit => visit.caregiverId === caregiver.id);
    const workload = getCaregiverWorkload(caregiver.id);
    
    return (
      <div style={style} className="hover:bg-muted/20 transition-colors group">
        <Card className="mx-2 my-1 shadow-sm border border-border/50">
          <div className="grid grid-cols-8 min-h-[120px]">
            {/* Caregiver Info Column */}
            <div className="p-4 border-r bg-card flex flex-col justify-center">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">
                    {caregiver.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground truncate">
                    {caregiver.name}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {caregiver.role} • {caregiver.region}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {workload.assignedHours}/{workload.maxHours} hrs
                  </Badge>
                </div>
                {!hasVisits && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCaregiverCollapse(caregiver.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
            
            {/* Time Slots Columns */}
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="border-r last:border-r-0 hover:bg-muted/10 transition-colors">
                <div className="p-2 space-y-2">
                  {timeSlots.map((time) => {
                    const visits = getVisitsForSlot(caregiver.id, day, time);
                    const isEmpty = visits.length === 0;
                    
                    return (
                      <div
                        key={time}
                        className={`min-h-[32px] rounded-md p-2 text-xs cursor-pointer transition-all duration-200 ${
                          visits.length > 0
                            ? 'bg-primary/10 hover:bg-primary/20 border border-primary/20 shadow-sm'
                            : 'hover:bg-muted/60 border border-dashed border-muted-foreground/30 bg-muted/5 hover:border-muted-foreground/50'
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
                              <div key={visit.id} className="bg-background rounded-sm p-1.5 shadow-sm border border-border/20">
                                <div className="font-medium truncate text-xs text-foreground">
                                  {visit.patientName}
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                                  <Clock className="w-3 h-3" />
                                  <span>{visit.startTime}</span>
                                </div>
                                <Badge variant="secondary" className="text-xs mt-1">
                                  {visit.serviceType}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-muted-foreground/60 text-center text-xs font-medium">
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
        </Card>
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
              placeholder="Search caregivers by name..."
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
        <div className="overflow-hidden max-h-[calc(100vh-300px)]">
          <div className="min-w-[900px]">
            {/* Sticky Header */}
            <div className="grid grid-cols-8 border-b sticky top-0 bg-background z-20 shadow-md">
              <div className="p-4 border-r bg-muted/80 font-semibold backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Caregivers ({flattenedData.filter(item => item.type === 'caregiver').length})
                </div>
              </div>
              {weekDays.map((day) => (
                <div key={day.toISOString()} className="p-4 border-r last:border-r-0 bg-muted/80 text-center backdrop-blur-sm">
                  <div className="font-semibold text-foreground">{format(day, 'EEE')}</div>
                  <div className="text-sm text-muted-foreground">{format(day, 'MMM d')}</div>
                </div>
              ))}
            </div>

            {/* Virtualized Rows */}
            <div className="bg-muted/5">
              <List
                height={Math.min(700, Math.max(400, flattenedData.length * 120))}
                itemCount={flattenedData.length}
                itemSize={getItemSize}
                width="100%"
                overscanCount={5}
              >
                {Row}
              </List>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualizedWeekScheduler;
