
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Filter, ToggleLeft, ToggleRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import VisitCard from '@/components/ui/visit-card';
import { Button } from '@/components/ui/button';
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';

const CaregiverSchedule: React.FC = () => {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('week');
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  
  const weekStart = startOfWeek(selectedWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const mockVisits = [
    {
      id: '1',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '9:00 AM',
      duration: '1 hour',
      status: 'completed' as const,
      patientName: 'John Smith',
      tasks: ['Medication', 'Vitals', 'Exercises'],
      careInstructions: 'Monitor blood pressure carefully. Patient has history of hypertension.',
      isCompleted: true,
    },
    {
      id: '2',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '11:30 AM',
      duration: '45 min',
      status: 'scheduled' as const,
      patientName: 'Emma Wilson',
      tasks: ['Bathing', 'Meal Prep', 'Light Cleaning'],
      careInstructions: 'Patient prefers shower in the morning. Check mobility aids.',
      isCompleted: false,
    },
    {
      id: '3',
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      time: '10:00 AM',
      duration: '1 hour',
      status: 'scheduled' as const,
      patientName: 'Robert Brown',
      tasks: ['Wound Care', 'Medication', 'Vitals'],
      careInstructions: 'Wound dressing change required. Use sterile technique.',
      isCompleted: false,
    },
    {
      id: '4',
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      time: '2:00 PM',
      duration: '1 hour',
      status: 'scheduled' as const,
      patientName: 'Sarah Johnson',
      tasks: ['Medication', 'Vitals', 'Physical Therapy'],
      careInstructions: 'Focus on range of motion exercises. Patient is recovering from surgery.',
      isCompleted: false,
    },
  ];

  const getVisitsForDay = (day: Date) => {
    return mockVisits.filter(visit => 
      format(new Date(visit.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
  };

  const nextWeek = () => setSelectedWeek(addWeeks(selectedWeek, 1));
  const prevWeek = () => setSelectedWeek(subWeeks(selectedWeek, 1));
  const nextDay = () => setSelectedDay(addDays(selectedDay, 1));
  const prevDay = () => setSelectedDay(subDays(selectedDay, 1));

  return (
    <Layout title="Schedule" role="caregiver">
      <div className="flex flex-col space-y-4">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">Your Schedule</h2>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm">Day</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(viewMode === 'day' ? 'week' : 'day')}
                className="p-1"
              >
                {viewMode === 'week' ? (
                  <ToggleRight className="h-6 w-6 text-primary" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-gray-400" />
                )}
              </Button>
              <span className="text-sm">Week</span>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={viewMode === 'week' ? prevWeek : prevDay}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-center px-4">
              {viewMode === 'week' ? (
                <span className="font-medium">
                  {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
                </span>
              ) : (
                <span className="font-medium">
                  {format(selectedDay, 'EEEE, MMM d, yyyy')}
                </span>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={viewMode === 'week' ? nextWeek : nextDay}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Week View */}
        {viewMode === 'week' && (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weekDays.map((day) => {
              const dayVisits = getVisitsForDay(day);
              const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
              
              return (
                <div
                  key={day.toISOString()}
                  className={`bg-white rounded-lg border p-4 min-h-[200px] ${
                    isToday ? 'ring-2 ring-primary ring-opacity-50' : ''
                  }`}
                >
                  <div className="text-center mb-3">
                    <div className="font-medium">{format(day, 'EEE')}</div>
                    <div className={`text-2xl font-bold ${isToday ? 'text-primary' : ''}`}>
                      {format(day, 'd')}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {dayVisits.map((visit) => (
                      <div
                        key={visit.id}
                        className={`p-2 rounded border text-xs cursor-pointer hover:shadow-md transition-all ${
                          visit.isCompleted
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-blue-50 border-blue-200 text-blue-800'
                        }`}
                        onClick={() => {
                          // Expand to show care instructions
                          console.log('Expand visit details:', visit);
                        }}
                      >
                        <div className="font-medium">{visit.time}</div>
                        <div className="truncate">{visit.patientName}</div>
                        <div className="text-gray-600">{visit.duration}</div>
                        {visit.isCompleted && (
                          <div className="text-green-600 font-medium mt-1">✓ Completed</div>
                        )}
                      </div>
                    ))}
                    
                    {dayVisits.length === 0 && (
                      <div className="text-gray-400 text-center py-4">
                        <Clock className="h-6 w-6 mx-auto mb-2 opacity-50" />
                        <div className="text-sm">Free</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Day View */}
        {viewMode === 'day' && (
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b">
              <h3 className="font-semibold">{format(selectedDay, 'EEEE, MMMM d, yyyy')}</h3>
            </div>
            
            <div className="p-4 space-y-4">
              {getVisitsForDay(selectedDay).map((visit) => (
                <VisitCard key={visit.id} visit={visit} role="caregiver" />
              ))}
              
              {getVisitsForDay(selectedDay).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No scheduled visits for this day</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CaregiverSchedule;
