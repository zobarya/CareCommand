
import React from 'react';
import { Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TimeSlotCellProps } from './types';

const TimeSlotCell: React.FC<TimeSlotCellProps> = ({
  caregiverId,
  caregiverName,
  day,
  time,
  visits,
  isDragOver,
  onSlotClick,
  onVisitClick,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const slotId = `${caregiverId}-${day.toISOString().split('T')[0]}-${time}`;

  const handleClick = () => {
    if (visits.length > 0) {
      onVisitClick(visits[0]);
    } else {
      onSlotClick(caregiverId, caregiverName, day.toISOString().split('T')[0], time);
    }
  };

  return (
    <div
      className={`h-14 border border-border/50 cursor-pointer transition-all duration-200 flex items-center justify-center p-1 ${
        visits.length > 0
          ? 'bg-primary/10 hover:bg-primary/20 border-primary/30'
          : isDragOver
          ? 'bg-primary/20 border-primary/50'
          : 'hover:bg-muted/40 hover:border-primary/30'
      }`}
      onClick={handleClick}
      onDragOver={(e) => onDragOver(e, slotId)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, caregiverId, day, time)}
    >
      {visits.length > 0 ? (
        <div className="w-full text-center">
          {visits.map((visit) => (
            <div key={visit.id} className="bg-background/90 rounded p-1">
              <div className="flex items-center justify-center gap-1 mb-1">
                <User className="w-3 h-3 text-primary" />
                <span className="font-medium text-xs truncate">{visit.patientName}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {visit.serviceType}
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground/60 text-xs text-center">
          <Clock className="w-3 h-3 mx-auto mb-1" />
          <span>{time}</span>
        </div>
      )}
    </div>
  );
};

export default TimeSlotCell;
