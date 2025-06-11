
import React from 'react';
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
}

const SimpleSchedulerGrid: React.FC<SimpleSchedulerGridProps> = ({
  caregivers,
  scheduledVisits,
  selectedWeek,
  onSlotClick,
  onVisitClick,
}) => {
  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const getVisitsForSlot = (caregiverId: string, date: Date, time: string) => {
    return scheduledVisits.filter(visit => {
      const visitDate = parseISO(visit.date);
      return visit.caregiverId === caregiverId &&
             isSameDay(visitDate, date) &&
             visit.startTime === time;
    });
  };

  const TimeSlot = ({ caregiverId, caregiverName, day, time, visits }: {
    caregiverId: string;
    caregiverName: string;
    day: Date;
    time: string;
    visits: any[];
  }) => {
    const handleClick = () => {
      if (visits.length > 0) {
        onVisitClick(visits[0]);
      } else {
        onSlotClick(caregiverId, caregiverName, day.toISOString().split('T')[0], time);
      }
    };

    return (
      <div
        className={`h-20 border border-border/30 cursor-pointer transition-all duration-200 ${
          visits.length > 0
            ? 'bg-primary/10 hover:bg-primary/20 border-primary/40'
            : 'hover:bg-muted/60 hover:border-primary/30'
        }`}
        onClick={handleClick}
      >
        {visits.length > 0 ? (
          <div className="p-2 h-full">
            {visits.map((visit) => (
              <div key={visit.id} className="bg-background/90 rounded p-1 mb-1 text-xs">
                <div className="flex items-center gap-1 mb-1">
                  <User className="w-3 h-3 text-primary" />
                  <span className="font-medium truncate">{visit.patientName}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {visit.serviceType}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-muted-foreground/60 text-xs">
              <Clock className="w-3 h-3 mx-auto mb-1" />
              {time}
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
          Weekly Schedule
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

            {/* Caregivers and their schedules */}
            {caregivers.map((caregiver) => (
              <div key={caregiver.id} className="border-b border-border">
                {/* Caregiver info */}
                <div className="grid grid-cols-8 bg-card">
                  <div className="p-4 border-r border-border bg-muted/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {caregiver.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">{caregiver.name}</div>
                        <div className="text-sm text-muted-foreground">{caregiver.role}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-7 p-4 border-r border-border">
                    <div className="text-sm text-muted-foreground">
                      Region: {caregiver.region} | Workload: {caregiver.assignedHours}/{caregiver.maxHours} hrs
                    </div>
                  </div>
                </div>

                {/* Time slots for each day */}
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-8 border-t border-border/30">
                    <div className="p-2 border-r border-border bg-muted/5 flex items-center justify-center">
                      <span className="text-sm font-medium">{time}</span>
                    </div>
                    {weekDays.map((day) => {
                      const visits = getVisitsForSlot(caregiver.id, day, time);
                      return (
                        <TimeSlot
                          key={`${caregiver.id}-${day.toISOString()}-${time}`}
                          caregiverId={caregiver.id}
                          caregiverName={caregiver.name}
                          day={day}
                          time={time}
                          visits={visits}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleSchedulerGrid;
