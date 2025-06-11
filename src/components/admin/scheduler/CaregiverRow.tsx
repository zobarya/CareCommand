
import React from 'react';
import DayColumn from './DayColumn';
import { CaregiverRowProps } from './types';

const CaregiverRow: React.FC<CaregiverRowProps> = ({
  caregiver,
  weekDays,
  visits,
  dragOverSlot,
  onSlotClick,
  onVisitClick,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  return (
    <div className="border-b border-border">
      <div className="grid grid-cols-8 min-h-[140px]">
        {/* Caregiver info column */}
        <div className="p-4 border-r border-border bg-muted/10 flex items-center">
          <div className="flex items-center gap-3 w-full">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">
                {caregiver.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm truncate">{caregiver.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {caregiver.role}
              </div>
              <div className="text-xs text-muted-foreground">
                {caregiver.region}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {caregiver.assignedHours}/{caregiver.maxHours} hrs
              </div>
            </div>
          </div>
        </div>

        {/* Day columns */}
        {weekDays.map((day) => {
          const dayId = `${caregiver.id}-${day.toISOString().split('T')[0]}`;
          const isDragOver = dragOverSlot === dayId;
          
          return (
            <DayColumn
              key={`${caregiver.id}-${day.toISOString()}`}
              caregiverId={caregiver.id}
              caregiverName={caregiver.name}
              day={day}
              visits={visits}
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
    </div>
  );
};

export default CaregiverRow;
