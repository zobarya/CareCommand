
import React from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SchedulerTimeSlotProps } from './types';

const SchedulerTimeSlot: React.FC<SchedulerTimeSlotProps> = ({
  caregiverId,
  caregiverName,
  day,
  time,
  visits,
  onSlotClick,
  onVisitClick,
}) => {
  const isEmpty = visits.length === 0;

  const handleClick = () => {
    if (visits.length > 0) {
      onVisitClick(visits[0]);
    } else {
      onSlotClick(caregiverId, caregiverName, day, time);
    }
  };

  return (
    <div
      className={`min-h-[28px] rounded-md p-1.5 text-xs cursor-pointer transition-all duration-200 border ${
        visits.length > 0
          ? 'bg-primary/10 hover:bg-primary/20 border-primary/30 shadow-sm'
          : 'hover:bg-muted/60 border-dashed border-muted-foreground/30 bg-muted/5 hover:border-muted-foreground/50'
      }`}
      onClick={handleClick}
    >
      {visits.length > 0 ? (
        <div className="space-y-1">
          {visits.map((visit) => (
            <div key={visit.id} className="bg-background rounded-sm p-1 shadow-sm border border-border/20">
              <div className="font-medium truncate text-xs text-foreground">
                {visit.patientName}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <Clock className="w-3 h-3" />
                <span>{visit.startTime}</span>
              </div>
              <Badge variant="secondary" className="text-xs mt-1">
                {visit.serviceType}
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground/60 text-center text-xs font-medium py-1">
          {time}
        </div>
      )}
    </div>
  );
};

export default SchedulerTimeSlot;
