
import React from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import { Clock, User, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface DayColumnProps {
  caregiverId: string;
  caregiverName: string;
  day: Date;
  visits: any[];
  isDragOver: boolean;
  onSlotClick: (caregiverId: string, caregiverName: string, date: string, time: string) => void;
  onVisitClick: (visit: any) => void;
  onDragOver: (e: React.DragEvent, slotId: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, caregiverId: string, date: Date, time: string) => void;
}

const DayColumn: React.FC<DayColumnProps> = ({
  caregiverId,
  caregiverName,
  day,
  visits,
  isDragOver,
  onSlotClick,
  onVisitClick,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const dayId = `${caregiverId}-${day.toISOString().split('T')[0]}`;
  const dayVisits = visits.filter(visit => {
    const visitDate = parseISO(visit.date);
    return isSameDay(visitDate, day);
  }).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const handleColumnClick = () => {
    // When clicking empty space, suggest next available time slot
    const nextHour = dayVisits.length > 0 
      ? Math.max(...dayVisits.map(v => parseInt(v.startTime.split(':')[0]))) + 1
      : 9; // Default to 9 AM
    const suggestedTime = `${nextHour.toString().padStart(2, '0')}:00`;
    onSlotClick(caregiverId, caregiverName, day.toISOString().split('T')[0], suggestedTime);
  };

  const handleVisitClick = (visit: any, e: React.MouseEvent) => {
    e.stopPropagation();
    onVisitClick(visit);
  };

  return (
    <div
      className={`min-h-[120px] border border-border/50 p-2 transition-all duration-200 ${
        isDragOver
          ? 'bg-primary/20 border-primary/50'
          : 'hover:bg-muted/20 hover:border-primary/30'
      }`}
      onDragOver={(e) => onDragOver(e, dayId)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, caregiverId, day, '09:00')}
      onClick={handleColumnClick}
    >
      {/* Day header */}
      <div className="text-xs text-muted-foreground mb-2 font-medium">
        {format(day, 'EEE d')}
      </div>

      {/* Visits stack */}
      <div className="space-y-2">
        {dayVisits.map((visit) => (
          <Card 
            key={visit.id} 
            className="p-2 cursor-pointer hover:shadow-md transition-shadow bg-primary/10 border-primary/30"
            onClick={(e) => handleVisitClick(visit, e)}
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium">{visit.startTime}</span>
                </div>
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  {visit.duration}m
                </Badge>
              </div>
              
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs font-medium truncate">{visit.patientName}</span>
              </div>
              
              <div className="text-xs text-muted-foreground truncate">
                {visit.serviceType}
              </div>
            </div>
          </Card>
        ))}

        {/* Add visit button when empty or on hover */}
        {dayVisits.length === 0 && (
          <div className="flex items-center justify-center h-16 text-muted-foreground/60 border-2 border-dashed border-muted-foreground/20 rounded">
            <div className="text-center">
              <Plus className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">Add Visit</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayColumn;
