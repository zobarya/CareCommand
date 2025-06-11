
import React from 'react';
import { parseISO, isSameDay } from 'date-fns';
import TimeSlotCell from './TimeSlotCell';
import { CaregiverRowProps } from './types';

const CaregiverRow: React.FC<CaregiverRowProps> = ({
  caregiver,
  weekDays,
  timeSlots,
  visits,
  dragOverSlot,
  onSlotClick,
  onVisitClick,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const getVisitsForSlot = (caregiverId: string, date: Date, time: string) => {
    return visits.filter(visit => {
      const visitDate = parseISO(visit.date);
      return visit.caregiverId === caregiverId &&
             isSameDay(visitDate, date) &&
             visit.startTime === time;
    });
  };

  return (
    <div className="border-b border-border">
      {/* Caregiver header row */}
      <div className="grid grid-cols-8 bg-card border-b border-border/50 min-h-[80px]">
        <div className="p-3 border-r border-border bg-muted/10 flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">
                {caregiver.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate">{caregiver.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {caregiver.role} - {caregiver.region}
              </div>
              <div className="text-xs text-muted-foreground">
                {caregiver.assignedHours}/{caregiver.maxHours} hrs
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-7 p-3 flex items-center">
          <div className="text-sm text-muted-foreground">
            Weekly Schedule
          </div>
        </div>
      </div>

      {/* Time slots for this caregiver */}
      {timeSlots.map((time) => (
        <div key={`${caregiver.id}-${time}`} className="grid grid-cols-8 border-b border-border/30 min-h-[56px]">
          {/* Time column */}
          <div className="p-2 border-r border-border bg-muted/5 flex items-center justify-center">
            <span className="text-sm font-medium">{time}</span>
          </div>
          
          {/* Day columns */}
          {weekDays.map((day) => {
            const slotId = `${caregiver.id}-${day.toISOString().split('T')[0]}-${time}`;
            const slotVisits = getVisitsForSlot(caregiver.id, day, time);
            const isDragOver = dragOverSlot === slotId;
            
            return (
              <TimeSlotCell
                key={`${caregiver.id}-${day.toISOString()}-${time}`}
                caregiverId={caregiver.id}
                caregiverName={caregiver.name}
                day={day}
                time={time}
                visits={slotVisits}
                isDragOver={isDragOver}
                onSlotClick={onSlotClick}
                onVisitClick={onVisitClick}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CaregiverRow;
