
import React, { useState } from 'react';
import { format, addDays, startOfWeek, parseISO, isSameDay } from 'date-fns';
import { Clock, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SimpleSchedulerGridProps {
  caregivers: any[];
  scheduledVisits: any[];
  selectedWeek: Date;
  onSlotClick: (caregiverId: string, caregiverName: string, date: string, time: string) => void;
  onVisitClick: (visit: any) => void;
  onVisitDrop?: (visitId: string, caregiverId: string, date: string, time: string) => void;
}

const SimpleSchedulerGrid: React.FC<SimpleSchedulerGridProps> = ({
  caregivers,
  scheduledVisits,
  selectedWeek,
  onSlotClick,
  onVisitClick,
  onVisitDrop,
}) => {
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);
  
  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));

  const getVisitsForDay = (caregiverId: string, date: Date) => {
    return scheduledVisits.filter(visit => {
      const visitDate = parseISO(visit.date);
      return visit.caregiverId === caregiverId && isSameDay(visitDate, date);
    });
  };

  const handleDragOver = (e: React.DragEvent, slotId: string) => {
    if (!onVisitDrop) return;
    e.preventDefault();
    setDragOverSlot(slotId);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e: React.DragEvent, caregiverId: string, date: Date) => {
    if (!onVisitDrop) return;
    e.preventDefault();
    setDragOverSlot(null);
    
    const visitId = e.dataTransfer.getData('text/plain');
    if (visitId) {
      const dateString = format(date, 'yyyy-MM-dd');
      // Use a default time when dropping on a day cell
      onVisitDrop(visitId, caregiverId, dateString, '09:00');
    }
  };

  const DayCell = ({ caregiverId, caregiverName, day, visits }: {
    caregiverId: string;
    caregiverName: string;
    day: Date;
    visits: any[];
  }) => {
    const slotId = `${caregiverId}-${format(day, 'yyyy-MM-dd')}`;
    const isDragOver = dragOverSlot === slotId;

    const handleClick = () => {
      if (visits.length > 0) {
        onVisitClick(visits[0]);
      } else {
        const dateString = format(day, 'yyyy-MM-dd');
        onSlotClick(caregiverId, caregiverName, dateString, '09:00');
      }
    };

    return (
      <div
        className={`h-24 border border-border/30 cursor-pointer transition-all duration-200 p-2 ${
          visits.length > 0
            ? 'bg-primary/10 hover:bg-primary/20 border-primary/40'
            : isDragOver
            ? 'bg-primary/20 border-primary/50'
            : 'hover:bg-muted/60 hover:border-primary/30'
        }`}
        onClick={handleClick}
        onDragOver={(e) => handleDragOver(e, slotId)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, caregiverId, day)}
      >
        {visits.length > 0 ? (
          <div className="space-y-1 h-full overflow-y-auto">
            {visits.map((visit) => (
              <div 
                key={visit.id} 
                className="bg-background/90 rounded p-1 text-xs cursor-pointer hover:shadow-md transition-shadow"
                draggable
                onDragStart={(e) => {
                  e.stopPropagation();
                  e.dataTransfer.setData('text/plain', visit.id);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onVisitClick(visit);
                }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3 text-primary flex-shrink-0" />
                  <span className="font-medium text-xs">{visit.startTime}</span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <User className="w-3 h-3 text-primary flex-shrink-0" />
                  <span className="font-medium truncate text-xs">{visit.patientName}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {visit.serviceType}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-muted-foreground/60 text-xs text-center">
              <Calendar className="w-4 h-4 mx-auto mb-1" />
              <span>Add Visit</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Weekly Schedule - {format(weekStart, 'MMM d, yyyy')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Header with days */}
            <div className="grid grid-cols-8 border-b-2 border-border bg-muted/20">
              <div className="p-4 border-r border-border font-semibold">
                Caregivers
              </div>
              {weekDays.map((day) => (
                <div key={day.toISOString()} className="p-4 border-r border-border last:border-r-0 text-center">
                  <div className="font-semibold">{format(day, 'EEE')}</div>
                  <div className="text-sm text-muted-foreground">{format(day, 'MMM d')}</div>
                </div>
              ))}
            </div>

            {/* Caregivers and their daily schedules */}
            {caregivers.map((caregiver) => (
              <div key={caregiver.id} className="grid grid-cols-8 border-b border-border">
                {/* Caregiver info */}
                <div className="p-4 border-r border-border bg-muted/10 flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">
                        {caregiver.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{caregiver.name}</div>
                      <div className="text-sm text-muted-foreground">{caregiver.role}</div>
                      <div className="text-xs text-muted-foreground">
                        {caregiver.region} | {caregiver.assignedHours}/{caregiver.maxHours}h
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day cells */}
                {weekDays.map((day) => {
                  const visits = getVisitsForDay(caregiver.id, day);
                  return (
                    <DayCell
                      key={`${caregiver.id}-${day.toISOString()}`}
                      caregiverId={caregiver.id}
                      caregiverName={caregiver.name}
                      day={day}
                      visits={visits}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleSchedulerGrid;
