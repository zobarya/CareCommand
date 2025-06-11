
import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import VisitCard from '@/components/admin/scheduler/VisitCard';
import { useMobile } from '@/hooks/use-mobile';

interface Caregiver {
  id: string;
  name: string;
  role: string;
  photo: string;
  region: string;
  assignedHours: number;
  maxHours: number;
}

interface ScheduledVisit {
  id: string;
  caregiverId: string;
  patientName: string;
  serviceType: string;
  date: string;
  startTime: string;
  duration: number;
  status: 'scheduled' | 'conflict';
  notes?: string;
}

interface WeekViewSchedulerProps {
  caregivers: Caregiver[];
  scheduledVisits: ScheduledVisit[];
  selectedWeek: Date;
  onVisitMove: (visitId: string, newCaregiverId: string, newTimeSlot: string) => void;
  onVisitSelect: (visit: ScheduledVisit) => void;
}

const WeekViewScheduler: React.FC<WeekViewSchedulerProps> = ({
  caregivers,
  scheduledVisits,
  selectedWeek,
  onVisitMove,
  onVisitSelect,
}) => {
  const isMobile = useMobile();
  const weekStart = startOfWeek(selectedWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  if (isMobile) {
    return (
      <div className="space-y-4">
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-3">{format(day, 'EEEE, MMM d')}</h3>
            <div className="space-y-2">
              {caregivers.map((caregiver) => {
                const dayVisits = scheduledVisits.filter(
                  visit => visit.caregiverId === caregiver.id && 
                  format(new Date(visit.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                );
                
                if (dayVisits.length === 0) return null;
                
                return (
                  <div key={caregiver.id} className="border-l-4 border-primary pl-3">
                    <p className="font-medium text-sm">{caregiver.name}</p>
                    {dayVisits.map((visit) => (
                      <VisitCard
                        key={visit.id}
                        visit={visit}
                        onClick={() => onVisitSelect(visit)}
                        className="mt-2"
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-3 bg-gray-50 font-semibold border-r">Caregivers</div>
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="p-3 bg-gray-50 text-center border-r font-medium">
                <div>{format(day, 'EEE')}</div>
                <div className="text-sm text-gray-600">{format(day, 'MMM d')}</div>
              </div>
            ))}
          </div>
          
          {/* Caregiver Rows */}
          {caregivers.map((caregiver) => (
            <div key={caregiver.id} className="grid grid-cols-8 border-b min-h-[80px]">
              <div className="p-3 border-r bg-gray-50 flex items-center">
                <div className="flex items-center space-x-2">
                  <img
                    src={caregiver.photo}
                    alt={caregiver.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm">{caregiver.name}</p>
                    <p className="text-xs text-gray-600">{caregiver.role}</p>
                  </div>
                </div>
              </div>
              
              {weekDays.map((day) => {
                const dayVisits = scheduledVisits.filter(
                  visit => visit.caregiverId === caregiver.id && 
                  format(new Date(visit.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                );
                
                return (
                  <div
                    key={day.toISOString()}
                    className="p-2 border-r relative min-h-[80px] hover:bg-gray-50"
                  >
                    <div className="space-y-1">
                      {dayVisits.map((visit) => (
                        <VisitCard
                          key={visit.id}
                          visit={visit}
                          onClick={() => onVisitSelect(visit)}
                          isDraggable
                          onDragEnd={(newCaregiverId, newTimeSlot) => 
                            onVisitMove(visit.id, newCaregiverId, newTimeSlot)
                          }
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekViewScheduler;
