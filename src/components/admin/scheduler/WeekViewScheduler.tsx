
import React from 'react';
import { format, addDays, startOfWeek, isSameDay, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, User } from 'lucide-react';

interface WeekViewSchedulerProps {
  caregivers: any[];
  scheduledVisits: any[];
  selectedWeek: Date;
  onVisitMove: (visitId: string, newCaregiverId: string, newTimeSlot: string) => void;
  onVisitSelect: (visit: any) => void;
  onVisitAssign: (visitData: any) => void;
  onSlotClick: (caregiverId: string, caregiverName: string, date: string, time: string) => void;
}

const WeekViewScheduler: React.FC<WeekViewSchedulerProps> = ({
  caregivers,
  scheduledVisits,
  selectedWeek,
  onVisitMove,
  onVisitSelect,
  onVisitAssign,
  onSlotClick,
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

  const handleSlotClick = (caregiverId: string, caregiverName: string, date: Date, time: string) => {
    const visits = getVisitsForSlot(caregiverId, date, time);
    if (visits.length === 0) {
      // Empty slot - trigger add visit
      onSlotClick(caregiverId, caregiverName, format(date, 'yyyy-MM-dd'), time);
    }
  };

  const handleVisitClick = (visit: any) => {
    onVisitSelect(visit);
  };

  return (
    <Card className="flex-1 overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Week View Scheduler
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[calc(100vh-200px)]">
          <div className="min-w-[800px]">
            {/* Header with days */}
            <div className="grid grid-cols-8 border-b sticky top-0 bg-white z-10">
              <div className="p-3 border-r bg-gray-50 font-medium">Caregiver</div>
              {weekDays.map((day) => (
                <div key={day.toISOString()} className="p-3 border-r bg-gray-50 text-center">
                  <div className="font-medium">{format(day, 'EEE')}</div>
                  <div className="text-sm text-gray-600">{format(day, 'MMM d')}</div>
                </div>
              ))}
            </div>

            {/* Caregiver rows */}
            {caregivers.map((caregiver) => (
              <div key={caregiver.id} className="border-b">
                {/* Caregiver info */}
                <div className="grid grid-cols-8">
                  <div className="p-3 border-r bg-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {caregiver.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{caregiver.name}</div>
                        <div className="text-xs text-gray-600">{caregiver.specialization}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Day columns */}
                  {weekDays.map((day) => (
                    <div key={day.toISOString()} className="border-r min-h-[80px]">
                      <div className="p-1 space-y-1">
                        {timeSlots.map((time) => {
                          const visits = getVisitsForSlot(caregiver.id, day, time);
                          return (
                            <div
                              key={time}
                              className={`min-h-[24px] rounded p-1 text-xs cursor-pointer transition-colors ${
                                visits.length > 0
                                  ? 'bg-blue-100 hover:bg-blue-200'
                                  : 'hover:bg-gray-100 border border-dashed border-gray-200'
                              }`}
                              onClick={() => {
                                if (visits.length > 0) {
                                  handleVisitClick(visits[0]);
                                } else {
                                  handleSlotClick(caregiver.id, caregiver.name, day, time);
                                }
                              }}
                            >
                              {visits.length > 0 ? (
                                <div className="space-y-1">
                                  {visits.map((visit) => (
                                    <div key={visit.id} className="bg-white rounded p-1 shadow-sm">
                                      <div className="font-medium truncate">{visit.patientName}</div>
                                      <div className="flex items-center gap-1 text-gray-600">
                                        <Clock className="w-3 h-3" />
                                        <span>{visit.startTime}</span>
                                      </div>
                                      <Badge variant="secondary" className="text-xs">
                                        {visit.serviceType}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-gray-400 text-center">
                                  {time}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeekViewScheduler;
