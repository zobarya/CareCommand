
import React, { useState } from 'react';
import { VirtualizedWeekSchedulerProps } from './types';
import SimpleSchedulerGrid from './SimpleSchedulerGrid';

interface ExtendedVirtualizedWeekSchedulerProps extends VirtualizedWeekSchedulerProps {
  searchTerm: string;
  regionFilter: string;
  roleFilter: string;
  groupByRegion: boolean;
}

const VirtualizedWeekScheduler: React.FC<ExtendedVirtualizedWeekSchedulerProps> = ({
  caregivers,
  scheduledVisits,
  selectedWeek,
  searchTerm,
  regionFilter,
  roleFilter,
  groupByRegion,
  onSlotClick,
  onVisitSelect,
  onVisitMove,
}) => {
  const handleSlotClick = (caregiverId: string, caregiverName: string, date: string, time: string) => {
    onSlotClick(caregiverId, caregiverName, date, time);
  };

  const handleVisitClick = (visit: any) => {
    onVisitSelect(visit);
  };

  const handleVisitDrop = (visitId: string, caregiverId: string, date: string, time: string) => {
    console.log('VirtualizedWeekScheduler: Visit dropped:', { visitId, caregiverId, date, time });
    onVisitMove(visitId, caregiverId, date, time);
  };

  return (
    <div className="h-full">
      <SimpleSchedulerGrid
        caregivers={caregivers}
        scheduledVisits={scheduledVisits}
        selectedWeek={selectedWeek}
        onSlotClick={handleSlotClick}
        onVisitClick={handleVisitClick}
        onVisitDrop={handleVisitDrop}
      />
    </div>
  );
};

export default VirtualizedWeekScheduler;
