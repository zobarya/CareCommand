import React, { useState, useMemo, useCallback } from 'react';
import { addDays, startOfWeek } from 'date-fns';
import { VariableSizeList as List } from 'react-window';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
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
  console.log('VirtualizedWeekScheduler received caregivers:', caregivers);
  console.log('VirtualizedWeekScheduler received scheduledVisits:', scheduledVisits);

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
    console.log('Filtering caregivers from:', caregivers);
    const filtered = caregivers.filter(caregiver => {
      const matchesSearch = caregiver.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === 'all' || caregiver.region === regionFilter;
      const matchesRole = roleFilter === 'all' || caregiver.role === roleFilter;
      return matchesSearch && matchesRegion && matchesRole;
    });
    console.log('Filtered caregivers:', filtered);
    return filtered;
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
            data.push({ type: 'caregiver', caregiver });
          });
        }
      });
    } else {
      filteredCaregivers.forEach(caregiver => {
        data.push({ type: 'caregiver', caregiver });
      });
    }
    
    console.log('Flattened data for rendering:', data);
    return data;
  }, [groupedCaregivers, groupByRegion, expandedRegions, filteredCaregivers]);

  const getItemSize = useCallback((index: number) => {
    const item = flattenedData[index];
    return item?.type === 'region' ? 70 : 140;
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
    console.log('Rendering row for item:', item, 'at index:', index);
    
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
    <Card className="flex-1 overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Enhanced Week Scheduler
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
        <div className="overflow-hidden max-h-[calc(100vh-300px)]">
          <div className="min-w-[900px]">
            <SchedulerWeekHeader
              weekDays={weekDays}
              caregiverCount={flattenedData.filter(item => item.type === 'caregiver').length}
            />

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
