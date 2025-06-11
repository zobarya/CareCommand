
import React from 'react';
import { format } from 'date-fns';
import { User } from 'lucide-react';
import { SchedulerWeekHeaderProps } from './types';

const SchedulerWeekHeader: React.FC<SchedulerWeekHeaderProps> = ({ weekDays }) => {
  return (
    <div className="sticky top-0 z-20 bg-background">
      <div className="grid grid-cols-8 border-b-2 border-border bg-muted/30">
        <div className="p-4 border-r border-border font-semibold bg-card">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Caregivers / Time
          </div>
        </div>
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="p-4 border-r border-border last:border-r-0 text-center bg-muted/20">
            <div className="font-semibold">{format(day, 'EEE')}</div>
            <div className="text-sm text-muted-foreground">{format(day, 'MMM d')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulerWeekHeader;
