
import React, { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(
    new Set(['North', 'Central', 'South', 'East', 'West'])
  );
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);

  // Group caregivers by region if needed
  const caregiverGroups: Record<string, Caregiver[]> = groupByRegion 
    ? caregivers.reduce((groups, caregiver) => {
        const region = caregiver.region;
        if (!groups[region]) groups[region] = [];
        groups[region].push(caregiver);
        return groups;
      }, {} as Record<string, Caregiver[]>)
    : { 'All': caregivers };

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

  const totalCaregivers = caregivers.length;
  const visibleCaregivers = groupByRegion 
    ? Object.entries(caregiverGroups).reduce((count, [region, regionCaregivers]) => {
        return count + (expandedRegions.has(region) ? regionCaregivers.length : 0);
      }, 0)
    : totalCaregivers;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 bg-background border-b">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <h2 className="text-lg font-semibold">
                Caregiver Schedule - Week of {format(weekStart, 'MMM d, yyyy')}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {visibleCaregivers} of {totalCaregivers} caregivers
              </Badge>
              {groupByRegion && (
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedRegions(new Set(['North', 'Central', 'South', 'East', 'West']))}
                  >
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Expand All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedRegions(new Set())}
                  >
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Collapse All
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="min-w-[1200px]">
            <SchedulerWeekHeader weekDays={weekDays} />

            {/* Caregiver sections */}
            <div className="pb-4">
              {Object.entries(caregiverGroups).map(([regionName, regionCaregivers]) => (
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
              
              {caregivers.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No caregivers found</p>
                  <p className="text-sm">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SchedulerGrid;
