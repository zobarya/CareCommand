
import React, { useState, useMemo, useCallback } from 'react';
import { addDays, startOfWeek } from 'date-fns';
import { VariableSizeList as List } from 'react-window';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, Calendar } from 'lucide-react';
import { VirtualizedWeekSchedulerProps } from './types';
import SchedulerHeader from './SchedulerHeader';
import SchedulerWeekHeader from './SchedulerWeekHeader';
import SchedulerRow from './SchedulerRow';

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

  // Always show all 3 caregivers for this focused design
  const filteredCaregivers = useMemo(() => {
    return caregivers; // Show all 3 caregivers regardless of filters
  }, [caregivers]);

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
            data.push({ type: 'caregiver', caregiver });
          });
        }
      });
    } else {
      // Show all 3 caregivers in a clean grid layout
      filteredCaregivers.forEach(caregiver => {
        data.push({ type: 'caregiver', caregiver });
      });
    }
    
    return data;
  }, [groupedCaregivers, groupByRegion, expandedRegions, filteredCaregivers]);

  const getItemSize = useCallback((index: number) => {
    const item = flattenedData[index];
    // Increased height for better visual spacing and readability
    return item?.type === 'region' ? 70 : 200;
  }, [flattenedData]);

  const handleSlotClick = (caregiverId: string, caregiverName: string, date: Date, time: string) => {
    onSlotClick(caregiverId, caregiverName, date.toISOString().split('T')[0], time);
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
    
    return (
      <SchedulerRow
        item={item}
        index={index}
        style={style}
        weekDays={weekDays}
        timeSlots={timeSlots}
        scheduledVisits={scheduledVisits}
        caregivers={caregivers}
        expandedRegions={expandedRegions}
        collapsedCaregivers={collapsedCaregivers}
        onToggleRegion={toggleRegion}
        onToggleCaregiverCollapse={toggleCaregiverCollapse}
        onSlotClick={handleSlotClick}
        onVisitClick={handleVisitClick}
      />
    );
  };

  return (
    <Card className="flex-1 overflow-hidden shadow-lg">
      <CardHeader className="pb-4 bg-gradient-to-r from-background to-muted/20 border-b">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="font-bold">Enhanced Scheduler</div>
            <div className="text-sm font-normal text-muted-foreground">
              Focused view with 3 caregivers
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{flattenedData.filter(item => item.type === 'caregiver').length} caregivers</span>
            </div>
          </div>
        </CardTitle>
        
        <SchedulerHeader
          searchTerm={searchTerm}
          regionFilter={regionFilter}
          roleFilter={roleFilter}
          groupByRegion={groupByRegion}
          regions={regions}
          roles={roles}
          caregiverCount={flattenedData.filter(item => item.type === 'caregiver').length}
          onSearchChange={setSearchTerm}
          onRegionFilterChange={setRegionFilter}
          onRoleFilterChange={setRoleFilter}
          onGroupByRegionToggle={() => setGroupByRegion(!groupByRegion)}
        />
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-hidden">
          <div className="min-w-[1000px]">
            <SchedulerWeekHeader
              weekDays={weekDays}
              caregiverCount={flattenedData.filter(item => item.type === 'caregiver').length}
            />

            <div className="bg-gradient-to-b from-background to-muted/10">
              <List
                height={Math.min(800, Math.max(600, flattenedData.length * 200))}
                itemCount={flattenedData.length}
                itemSize={getItemSize}
                width="100%"
                overscanCount={2}
                className="rounded-b-lg"
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
