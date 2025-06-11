
import React from 'react';
import { format } from 'date-fns';
import { Clock, User } from 'lucide-react';
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
      className={`min-h-[32px] rounded-lg p-2 text-xs cursor-pointer transition-all duration-300 border-2 shadow-sm ${
        visits.length > 0
          ? 'bg-gradient-to-r from-primary/15 to-primary/10 hover:from-primary/25 hover:to-primary/20 border-primary/40 shadow-md hover:shadow-lg'
          : 'hover:bg-muted/60 border-dashed border-muted-foreground/40 bg-card hover:border-primary/30 hover:shadow-md'
      }`}
      onClick={handleClick}
    >
      {visits.length > 0 ? (
        <div className="space-y-1.5">
          {visits.map((visit) => (
            <div key={visit.id} className="bg-background/90 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-border/30">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3 text-primary" />
                  <div className="font-semibold truncate text-xs text-foreground">
                    {visit.patientName}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground text-xs">{visit.startTime}</span>
                <span className="text-muted-foreground text-xs">({visit.duration || 60}min)</span>
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                {visit.serviceType}
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground/70 text-center text-xs font-medium py-2">
            <Clock className="w-3 h-3 mx-auto mb-1 opacity-60" />
            {time}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulerTimeSlot;
