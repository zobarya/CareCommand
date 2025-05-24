import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, Search, User, Plus, Pencil } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatusBadge from '@/components/ui/status-badge';
import AddVisitDialog from '@/components/admin/AddVisitDialog';
import EditVisitDialog from '@/components/admin/EditVisitDialog';
import { Button } from '@/components/ui/button';

interface Visit {
  id: string;
  date: Date;
  time: string;
  patientName: string;
  caregiverName: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  duration: string;
}

const AdminCalendar: React.FC = () => {
  const [isAddVisitOpen, setIsAddVisitOpen] = useState(false);
  const [isEditVisitOpen, setIsEditVisitOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  // Mock data with state management
  const [visits, setVisits] = useState<Visit[]>([
    {
      id: '1',
      date: new Date(2025, 4, 23),
      time: '9:00 AM',
      patientName: 'John Smith',
      caregiverName: 'Jane Doe, RN',
      status: 'scheduled' as const,
      duration: '1 hour'
    },
    {
      id: '2',
      date: new Date(2025, 4, 23),
      time: '11:30 AM',
      patientName: 'Emma Wilson',
      caregiverName: 'Mike Johnson, HHA',
      status: 'scheduled' as const,
      duration: '45 min'
    },
    {
      id: '3',
      date: new Date(2025, 4, 24),
      time: '10:00 AM',
      patientName: 'Robert Brown',
      caregiverName: 'Jane Doe, RN',
      status: 'scheduled' as const,
      duration: '1 hour'
    },
    {
      id: '4',
      date: new Date(2025, 4, 22),
      time: '2:00 PM',
      patientName: 'Sarah Johnson',
      caregiverName: 'Jane Doe, RN',
      status: 'completed' as const,
      duration: '1 hour'
    }
  ]);

  const handleVisitClick = (visit: Visit) => {
    setSelectedVisit(visit);
    setIsEditVisitOpen(true);
  };

  const handleEditVisit = (visit: Visit, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent row click when clicking edit button
    }
    setSelectedVisit(visit);
    setIsEditVisitOpen(true);
  };

  const handleUpdateVisit = (updatedVisit: Visit) => {
    setVisits(prev => prev.map(v => v.id === updatedVisit.id ? updatedVisit : v));
  };

  const handleAddVisit = (newVisitData: any) => {
    const newVisit: Visit = {
      id: (visits.length + 1).toString(),
      date: new Date(newVisitData.date),
      time: newVisitData.startTime,
      patientName: newVisitData.patient,
      caregiverName: newVisitData.caregiver,
      status: 'scheduled',
      duration: '1 hour' // Default duration
    };
    setVisits(prev => [...prev, newVisit]);
  };

  // Mock data
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  
  return (
    <Layout title="Calendar" role="admin">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search by patient or caregiver name..." 
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            className="flex items-center"
            onClick={() => setIsAddVisitOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Visit
          </Button>
          <Button variant="outline" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
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
            const isToday = dayNum === today.getDate() && isCurrentMonth;
            
            // Find visits for this day
            const dayVisits = visits.filter(v => 
              v.date.getDate() === dayNum && 
              v.date.getMonth() === today.getMonth() && 
              v.date.getFullYear() === today.getFullYear()
            );
            
            return (
              <div 
                key={index}
                className={`min-h-[80px] p-1 rounded-lg border ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'} ${isToday ? 'border-primary' : 'border-gray-100'}`}
              >
                <div className={`text-right text-sm ${isCurrentMonth ? 'font-medium' : 'text-gray-400'} ${isToday ? 'text-primary' : ''}`}>
                  {dayNum > 0 ? dayNum : ''}
                </div>
                {dayVisits.length > 0 && (
                  <div className="mt-1">
                    {dayVisits.slice(0, 2).map(visit => (
                      <div key={visit.id} className="bg-blue-50 p-1 rounded text-xs mb-1 truncate">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-primary" />
                          <span>{visit.time}</span>
                        </div>
                        <div className="truncate">{visit.patientName}</div>
                      </div>
                    ))}
                    {dayVisits.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayVisits.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">Today's Schedule</h2>
        
        <div className="space-y-4">
          {visits.filter(v => 
            v.date.getDate() === today.getDate() && 
            v.date.getMonth() === today.getMonth() && 
            v.date.getFullYear() === today.getFullYear()
          ).map(visit => (
            <div 
              key={visit.id} 
              className="flex items-start p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => handleVisitClick(visit)}
            >
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-medium">{visit.time} - {visit.duration}</h3>
                  <StatusBadge status={visit.status} />
                </div>
                <p className="font-medium">{visit.patientName}</p>
                <p className="text-sm text-gray-600">Caregiver: {visit.caregiverName}</p>
              </div>
              <button 
                className="flex-shrink-0 ml-2 text-primary hover:underline text-sm"
                onClick={(e) => handleEditVisit(visit, e)}
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <AddVisitDialog 
        open={isAddVisitOpen} 
        onOpenChange={setIsAddVisitOpen}
        onAdd={handleAddVisit}
      />
      <EditVisitDialog 
        open={isEditVisitOpen} 
        onOpenChange={setIsEditVisitOpen}
        visit={selectedVisit}
        onUpdate={handleUpdateVisit}
      />
    </Layout>
  );
};

export default AdminCalendar;
