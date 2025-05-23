import React from 'react';
import { Calendar, Clock, File, User } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import CardStat from '@/components/ui/card-stat';
import VisitCard from '@/components/ui/visit-card';

const AdminDashboard: React.FC = () => {
  // Mock data - with proper typing to avoid readonly arrays issue
  const upcomingVisits = [
    {
      id: '1',
      date: 'Today',
      time: '9:00 AM',
      duration: '1 hour',
      status: 'scheduled' as const,
      caregiverName: 'Jane Doe, RN',
      patientName: 'John Smith',
      tasks: ['Medication', 'Vitals', 'Exercises']
    },
    {
      id: '2',
      date: 'Today',
      time: '11:30 AM',
      duration: '45 min',
      status: 'scheduled' as const,
      caregiverName: 'Mike Johnson, HHA',
      patientName: 'Emma Wilson',
      tasks: ['Bathing', 'Meal Prep', 'Light Cleaning']
    },
    {
      id: '3',
      date: 'Tomorrow',
      time: '10:00 AM',
      duration: '1 hour',
      status: 'scheduled' as const,
      caregiverName: 'Jane Doe, RN',
      patientName: 'Robert Brown',
      tasks: ['Wound Care', 'Medication', 'Vitals']
    },
  ];
  
  return (
    <Layout title="Dashboard" role="admin">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <CardStat 
          title="Total Patients" 
          value={42} 
          icon={<User className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <CardStat 
          title="Active Caregivers" 
          value={18} 
          icon={<User className="h-5 w-5" />}
        />
        <CardStat 
          title="Today's Visits" 
          value={24} 
          icon={<Calendar className="h-5 w-5" />}
        />
        <CardStat 
          title="Pending Reports" 
          value={7} 
          icon={<File className="h-5 w-5" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Today's Schedule</h2>
              <button className="text-sm text-primary font-medium hover:underline">
                View Full Calendar
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingVisits.slice(0, 2).map((visit) => (
                <div key={visit.id} className="flex items-center p-3 border-l-4 border-primary bg-blue-50 rounded-r-lg">
                  <div className="flex-shrink-0 mr-3">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{visit.time} - {visit.patientName}</p>
                    <p className="text-sm text-gray-600">Caregiver: {visit.caregiverName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Recent Activity</h2>
              <button className="text-sm text-primary font-medium hover:underline">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 mt-1 w-2 h-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Jane Doe</span> completed a visit with 
                    <span className="font-medium"> John Smith</span>
                  </p>
                  <p className="text-xs text-gray-500">Today, 8:30 AM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">New care plan</span> created for 
                    <span className="font-medium"> Emma Wilson</span>
                  </p>
                  <p className="text-xs text-gray-500">Yesterday, 3:45 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 mt-1 w-2 h-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Mike Johnson</span> updated availability for next week
                  </p>
                  <p className="text-xs text-gray-500">Yesterday, 1:15 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg bg-primary text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule New Visit
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-secondary text-white flex items-center">
                <User className="h-5 w-5 mr-2" />
                Add New Patient
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-accent text-secondary flex items-center">
                <File className="h-5 w-5 mr-2" />
                Generate Report
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Upcoming Visits</h2>
              <button className="text-sm text-primary font-medium hover:underline">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingVisits.map((visit) => (
                <VisitCard key={visit.id} visit={visit} role="admin" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
