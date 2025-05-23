
import React from 'react';
import { Bell, Calendar, MessageSquare, User } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import VisitCard from '@/components/ui/visit-card';
import StatusBadge from '@/components/ui/status-badge';

const FamilyDashboard: React.FC = () => {
  // Mock data
  const upcomingVisits = [
    {
      id: '1',
      date: 'Today',
      time: '9:00 AM',
      duration: '1 hour',
      status: 'scheduled',
      caregiverName: 'Jane Doe, RN',
      tasks: ['Medication', 'Vitals', 'Exercises']
    },
    {
      id: '2',
      date: 'Friday, May 26',
      time: '11:30 AM',
      duration: '45 min',
      status: 'scheduled',
      caregiverName: 'Mike Johnson, HHA',
      tasks: ['Bathing', 'Meal Prep', 'Light Cleaning']
    },
  ] as const;
  
  const recentVisits = [
    {
      id: '4',
      date: 'Yesterday',
      time: '2:00 PM',
      duration: '1 hour',
      status: 'completed',
      caregiverName: 'Jane Doe, RN',
      tasks: ['Medication', 'Vitals', 'Physical Therapy']
    },
  ] as const;

  return (
    <Layout title="Home" role="family">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold">Patient: John Smith</h2>
            <p className="text-sm text-gray-600">Last updated: Today, 8:30 AM</p>
          </div>
          <div className="flex">
            <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
              <Bell className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary">
              <User className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-primary font-medium">NEXT VISIT</p>
              <p className="text-lg font-bold">{upcomingVisits[0].time} Today</p>
              <div className="flex items-center text-sm text-gray-600">
                <span>with {upcomingVisits[0].caregiverName}</span>
                <span className="mx-2">•</span>
                <span>{upcomingVisits[0].duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold mb-3">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="font-medium">Visit Completed</p>
                    <StatusBadge status="completed" className="ml-2" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Yesterday, 2:00 PM with Jane Doe, RN</p>
                  <div className="mt-2 text-sm">
                    <p>All tasks completed successfully. Patient was comfortable and responsive.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">New Message</p>
                  <p className="text-sm text-gray-600 mt-1">Yesterday, 3:15 PM from Care Team</p>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm">
                    <p>John is responding well to the new medication schedule. Please let us know if you notice any changes in his sleep pattern.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <User className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">Care Plan Updated</p>
                  <p className="text-sm text-gray-600 mt-1">May 22, 11:30 AM</p>
                  <div className="mt-2 text-sm">
                    <p>Physical therapy sessions increased to 3 times per week.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-bold mb-3">Quick Actions</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg bg-primary text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact Care Team
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-secondary text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Request Schedule Change
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-accent text-secondary flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Update Notifications
              </button>
            </div>
          </div>
          
          <h2 className="text-lg font-bold mb-3">Upcoming Visits</h2>
          <div className="space-y-4">
            {upcomingVisits.map((visit) => (
              <VisitCard key={visit.id} visit={visit} role="family" />
            ))}
            <button className="w-full py-2 text-primary font-medium text-center border border-primary rounded-lg hover:bg-primary/5">
              View All Visits
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FamilyDashboard;
