
import React from 'react';
import { VirtualizedWeekSchedulerProps } from './types';
import SimpleSchedulerGrid from './SimpleSchedulerGrid';

const VirtualizedWeekScheduler: React.FC<VirtualizedWeekSchedulerProps> = ({
  caregivers,
  scheduledVisits,
  selectedWeek,
  onSlotClick,
  onVisitSelect,
}) => {
  const handleSlotClick = (caregiverId: string, caregiverName: string, date: string, time: string) => {
    onSlotClick(caregiverId, caregiverName, date, time);
  };

  const handleVisitClick = (visit: any) => {
    onVisitSelect(visit);
  };

  return (
    <div className="flex-1 overflow-hidden">
      <SimpleSchedulerGrid
        caregivers={caregivers}
        scheduledVisits={scheduledVisits}
        selectedWeek={selectedWeek}
        onSlotClick={handleSlotClick}
        onVisitClick={handleVisitClick}
      />
    </div>
  );
};

export default VirtualizedWeekScheduler;
