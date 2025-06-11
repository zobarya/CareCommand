
import React, { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import CaregiverGroupHeader from './CaregiverGroupHeader';
import SchedulerWeekHeader from './SchedulerWeekHeader';
import CaregiverRow from './CaregiverRow';
import { SchedulerGridProps, Caregiver } from './types';

const SchedulerGrid: React.FC<SchedulerGridProps> = ({
  caregivers,
  scheduledVisits,
  selectedWeek,
  searchTerm,
  regionFilter,
  roleFilter,
  groupByRegion,
  onSlotClick,
  onVisitClick,
  onVisitDrop,
}) => {
  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set(['North', 'Central', 'South', 'East']));
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);

  // Filter caregivers based on search and filters
  const filteredCaregivers = caregivers.filter(caregiver => {
    const matchesSearch = caregiver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'all' || caregiver.region.toLowerCase() === regionFilter.toLowerCase();
    const matchesRole = roleFilter === 'all' || caregiver.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRegion && matchesRole;
  });

  // Group caregivers by region if needed
  const caregiverGroups: Record<string, Caregiver[]> = groupByRegion 
    ? filteredCaregivers.reduce((groups, caregiver) => {
        const region = caregiver.region;
        if (!groups[region]) groups[region] = [];
        groups[region].push(caregiver);
        return groups;
      }, {} as Record<string, Caregiver[]>)
    : { 'All': filteredCaregivers };

  const handleDragOver = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    setDragOverSlot(slotId);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e: React.DragEvent, caregiverId: string, date: Date, time: string) => {
    e.preventDefault();
    setDragOverSlot(null);
    
    const visitId = e.dataTransfer.getData('text/plain');
    if (visitId) {
      onVisitDrop(visitId, caregiverId, date.toISOString().split('T')[0], time);
    }
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

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Caregiver Schedule - Week of {format(weekStart, 'MMM d, yyyy')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="min-w-[1200px]">
            <SchedulerWeekHeader weekDays={weekDays} />

            {/* Caregiver sections */}
            {Object.entries(caregiverGroups).map(([regionName, regionCaregivers]: [string, Caregiver[]]) => (
              <div key={regionName}>
                {groupByRegion && (
                  <CaregiverGroupHeader
                    region={regionName}
                    caregiverCount={regionCaregivers.length}
                    isExpanded={expandedRegions.has(regionName)}
                    onToggle={() => toggleRegion(regionName)}
                  />
                )}
                
                {(!groupByRegion || expandedRegions.has(regionName)) && 
                  regionCaregivers.map((caregiver) => (
                    <CaregiverRow
                      key={caregiver.id}
                      caregiver={caregiver}
                      weekDays={weekDays}
                      timeSlots={timeSlots}
                      visits={scheduledVisits}
                      dragOverSlot={dragOverSlot}
                      onSlotClick={onSlotClick}
                      onVisitClick={onVisitClick}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    />
                  ))
                }
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SchedulerGrid;
