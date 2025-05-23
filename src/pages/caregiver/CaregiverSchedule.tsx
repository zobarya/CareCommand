
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Clock, Filter } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import VisitCard from '@/components/ui/visit-card';

const CaregiverSchedule: React.FC = () => {
  // Mock data
  const [activeView, setActiveView] = useState<'list' | 'calendar'>('list');
  const [activeDay, setActiveDay] = useState(new Date());
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentMonth = activeDay.toLocaleString('default', { month: 'long' });
  const currentYear = activeDay.getFullYear();
  
  const weekVisits = [
    {
      id: '1',
      date: 'Today',
      time: '9:00 AM',
      duration: '1 hour',
      status: 'scheduled' as const,
      patientName: 'John Smith',
      tasks: ['Medication', 'Vitals', 'Exercises']
    },
    {
      id: '2',
      date: 'Today',
      time: '11:30 AM',
      duration: '45 min',
      status: 'scheduled' as const,
      patientName: 'Emma Wilson',
      tasks: ['Bathing', 'Meal Prep', 'Light Cleaning']
    },
    {
      id: '3',
      date: 'Tomorrow',
      time: '10:00 AM',
      duration: '1 hour',
      status: 'scheduled' as const,
      patientName: 'Robert Brown',
      tasks: ['Wound Care', 'Medication', 'Vitals']
    },
    {
      id: '4',
      date: 'May 25',
      time: '2:00 PM',
      duration: '1 hour',
      status: 'scheduled' as const,
      patientName: 'Sarah Johnson',
      tasks: ['Medication', 'Vitals', 'Physical Therapy']
    },
    {
      id: '5',
      date: 'May 26',
      time: '10:30 AM',
      duration: '45 min',
      status: 'scheduled' as const,
      patientName: 'Michael Roberts',
      tasks: ['Meal Prep', 'Mobility Assistance']
    },
  ];

  return (
    <Layout title="Schedule" role="caregiver">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-bold mr-4">Your Schedule</h2>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeView === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveView('list')}
            >
              List
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeView === 'calendar' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveView('calendar')}
            >
              Calendar
            </button>
          </div>
        </div>
        <button className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
          <ChevronDown className="h-4 w-4 ml-2" />
        </button>
      </div>

      {activeView === 'list' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-medium text-gray-500 mb-4">This Week</h3>
            <div className="space-y-4">
              {weekVisits.map(visit => (
                <VisitCard key={visit.id} visit={visit} role="caregiver" />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-medium text-gray-500 mb-4">Next Week</h3>
            <div className="flex items-center justify-center p-6 text-gray-500 border-dashed border-2 border-gray-200 rounded-lg">
              <p>No scheduled visits for next week</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{currentMonth} {currentYear}</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, index) => {
              const dayNum = index - 4; // Start from previous month
              const isCurrentMonth = dayNum > 0 && dayNum <= 31;
              const isToday = dayNum === new Date().getDate() && isCurrentMonth;
              
              const hasVisits = weekVisits.some(v => v.date === (isToday ? 'Today' : 
                                                    (dayNum === new Date().getDate() + 1 ? 'Tomorrow' : '')));
              
              return (
                <div 
                  key={index}
                  className={`min-h-[80px] p-1 rounded-lg border cursor-pointer ${
                    isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                  } ${isToday ? 'border-primary' : 'border-gray-100'}`}
                >
                  <div className={`text-right text-sm ${
                    isCurrentMonth ? 'font-medium' : 'text-gray-400'
                  } ${isToday ? 'text-primary' : ''}`}>
                    {dayNum > 0 ? dayNum : ''}
                  </div>
                  {hasVisits && (
                    <div className="mt-1">
                      <div className="bg-blue-50 p-1 rounded text-xs mb-1 truncate flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-primary" />
                        <span>Visits</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CaregiverSchedule;
