
import React, { useState } from 'react';
import { VirtualizedWeekSchedulerProps } from './types';
import SchedulerGrid from './SchedulerGrid';

const VirtualizedWeekScheduler: React.FC<VirtualizedWeekSchedulerProps> = ({
  caregivers,
  scheduledVisits,
  selectedWeek,
  onSlotClick,
  onVisitSelect,
  onVisitMove,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [groupByRegion, setGroupByRegion] = useState(false);

  const handleSlotClick = (caregiverId: string, caregiverName: string, date: string, time: string) => {
    onSlotClick(caregiverId, caregiverName, date, time);
  };

  const handleVisitClick = (visit: any) => {
    onVisitSelect(visit);
  };

  const handleVisitDrop = (visitId: string, caregiverId: string, date: string, time: string) => {
    console.log('Visit dropped:', { visitId, caregiverId, date, time });
    onVisitMove(visitId, caregiverId, time);
  };

  return (
    <div className="flex-1 overflow-hidden">
      <SchedulerGrid
        caregivers={caregivers}
        scheduledVisits={scheduledVisits}
        selectedWeek={selectedWeek}
        searchTerm={searchTerm}
        regionFilter={regionFilter}
        roleFilter={roleFilter}
        groupByRegion={groupByRegion}
        onSlotClick={handleSlotClick}
        onVisitClick={handleVisitClick}
        onVisitDrop={handleVisitDrop}
      />
    </div>
  );
};

export default VirtualizedWeekScheduler;
