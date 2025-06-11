
import React from 'react';
import { format } from 'date-fns';
import { Users, Calendar } from 'lucide-react';
import { SchedulerWeekHeaderProps } from './types';

const SchedulerWeekHeader: React.FC<SchedulerWeekHeaderProps> = ({
  weekDays,
  caregiverCount,
}) => {
  return (
    <div className="grid grid-cols-8 border-b-2 border-border/50 sticky top-0 bg-gradient-to-r from-card to-muted/30 z-20 shadow-lg backdrop-blur-sm">
      <div className="p-6 border-r border-border/50 bg-card/90 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div className="text-center">
            <div className="font-bold text-base text-foreground">Caregivers</div>
            <div className="text-sm text-muted-foreground">({caregiverCount} active)</div>
          </div>
        </div>
      </div>
      {weekDays.map((day, index) => (
        <div key={day.toISOString()} className={`p-6 border-r border-border/50 last:border-r-0 text-center backdrop-blur-sm ${index % 2 === 0 ? 'bg-muted/20' : 'bg-card/90'}`}>
          <div className="flex flex-col items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <div>
              <div className="font-bold text-base text-foreground">{format(day, 'EEE')}</div>
              <div className="text-sm text-muted-foreground font-medium">{format(day, 'MMM d')}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchedulerWeekHeader;
