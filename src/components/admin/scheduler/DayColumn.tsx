
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
  onDrop: (e: React.DragEvent, caregiverId: string, date: string, time: string) => void;
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
  // Use date-fns format to avoid timezone issues
  const dayString = format(day, 'yyyy-MM-dd');
  const dayId = `${caregiverId}-${dayString}`;
  
  // Time slots for the day
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Filter visits by BOTH date AND caregiver ID
  const dayVisits = visits.filter(visit => {
    const visitDate = parseISO(visit.date);
    const isCorrectDate = isSameDay(visitDate, day);
    const isCorrectCaregiver = visit.caregiverId === caregiverId;
    return isCorrectDate && isCorrectCaregiver;
  }).sort((a, b) => a.startTime.localeCompare(b.startTime));

  console.log('DayColumn render:', { 
    caregiverId, 
    caregiverName,
    day: dayString, 
    totalVisits: visits.length, 
    dayVisits: dayVisits.length,
    dayVisitsDetails: dayVisits.map(v => ({ id: v.id, caregiverId: v.caregiverId, patient: v.patientName, time: v.startTime }))
  });

  const getVisitsForTimeSlot = (timeSlot: string) => {
    return dayVisits.filter(visit => visit.startTime === timeSlot);
  };

  const handleTimeSlotClick = (timeSlot: string) => {
    const visitsAtTime = getVisitsForTimeSlot(timeSlot);
    if (visitsAtTime.length > 0) {
      // If there's a visit at this time, open it
      onVisitClick(visitsAtTime[0]);
    } else {
      // If no visit, create new one at this specific time
      console.log('DayColumn: Time slot clicked:', timeSlot, 'for caregiver:', caregiverId);
      onSlotClick(caregiverId, caregiverName, dayString, timeSlot);
    }
  };

  const handleVisitClick = (visit: any, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('DayColumn: Visit clicked:', visit);
    onVisitClick(visit);
  };

  const handleDragOver = (e: React.DragEvent, timeSlot?: string) => {
    e.preventDefault();
    const slotId = timeSlot ? `${dayId}-${timeSlot}` : dayId;
    console.log('DayColumn: Drag over:', slotId);
    onDragOver(e, slotId);
  };

  const handleDrop = (e: React.DragEvent, timeSlot?: string) => {
    e.preventDefault();
    const visitId = e.dataTransfer.getData('text/plain');
    console.log('DayColumn: Drop event for caregiver:', caregiverId, 'on day:', dayString, 'at time:', timeSlot);
    
    if (!visitId) {
      console.error('No visit ID found in drag data');
      return;
    }
    
    // Use the specific time slot if provided, otherwise use a default
    const dropTime = timeSlot || '09:00';
    
    console.log('DayColumn: Calling onDrop with:', { visitId, caregiverId, targetDate: dayString, dropTime });
    
    onDrop(e, caregiverId, dayString, dropTime);
  };

  return (
    <div
      className={`min-h-[120px] border border-border/50 transition-all duration-200 ${
        isDragOver
          ? 'bg-primary/20 border-primary/50'
          : 'hover:bg-muted/20 hover:border-primary/30'
      }`}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={onDragLeave}
      onDrop={(e) => handleDrop(e)}
    >
      {/* Day header */}
      <div className="text-xs text-muted-foreground mb-2 font-medium p-2">
        {format(day, 'EEE d')}
      </div>

      {/* Time slots */}
      <div className="space-y-1 p-2">
        {timeSlots.map((timeSlot) => {
          const visitsAtTime = getVisitsForTimeSlot(timeSlot);
          const slotId = `${dayId}-${timeSlot}`;
          
          return (
            <div
              key={timeSlot}
              className={`min-h-[40px] rounded border cursor-pointer transition-all duration-200 p-2 ${
                visitsAtTime.length > 0
                  ? 'bg-primary/10 border-primary/30 hover:bg-primary/20'
                  : 'border-dashed border-muted-foreground/20 hover:bg-muted/30 hover:border-primary/30'
              }`}
              onClick={() => handleTimeSlotClick(timeSlot)}
              onDragOver={(e) => handleDragOver(e, timeSlot)}
              onDrop={(e) => handleDrop(e, timeSlot)}
            >
              {visitsAtTime.length > 0 ? (
                <div className="space-y-1">
                  {visitsAtTime.map((visit) => (
                    <Card 
                      key={visit.id} 
                      className="p-2 cursor-pointer hover:shadow-md transition-shadow bg-background border-primary/30"
                      onClick={(e) => handleVisitClick(visit, e)}
                      draggable
                      onDragStart={(e) => {
                        console.log('DayColumn: Starting drag for visit:', visit.id, 'from caregiver:', caregiverId);
                        e.dataTransfer.setData('text/plain', visit.id);
                      }}
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
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground/60">
                  <div className="text-center">
                    <Clock className="w-3 h-3 mx-auto mb-1" />
                    <span className="text-xs">{timeSlot}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayColumn;
