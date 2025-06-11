
import React from 'react';
import { format } from 'date-fns';
import { Users } from 'lucide-react';
import { SchedulerWeekHeaderProps } from './types';

const SchedulerWeekHeader: React.FC<SchedulerWeekHeaderProps> = ({
  weekDays,
  caregiverCount,
}) => {
  return (
    <div className="grid grid-cols-8 border-b sticky top-0 bg-background z-20 shadow-md">
      <div className="p-4 border-r bg-muted/80 font-semibold backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Caregivers ({caregiverCount})
        </div>
      </div>
      {weekDays.map((day) => (
        <div key={day.toISOString()} className="p-4 border-r last:border-r-0 bg-muted/80 text-center backdrop-blur-sm">
          <div className="font-semibold text-foreground">{format(day, 'EEE')}</div>
          <div className="text-sm text-muted-foreground">{format(day, 'MMM d')}</div>
        </div>
      ))}
    </div>
  );
};

export default SchedulerWeekHeader;
