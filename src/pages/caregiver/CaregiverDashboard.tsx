import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import VisitCard from '@/components/ui/visit-card';

const CaregiverDashboard: React.FC = () => {
  // Mock data - with proper typing to avoid readonly arrays issue
  const upcomingVisits = [
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
  ];
  
  const recentVisits = [
    {
      id: '4',
      date: 'Yesterday',
      time: '2:00 PM',
      duration: '1 hour',
      status: 'completed' as const,
      patientName: 'Sarah Johnson',
      tasks: ['Medication', 'Vitals', 'Physical Therapy']
    },
    {
      id: '5',
      date: 'Yesterday',
      time: '10:30 AM',
      duration: '45 min',
      status: 'completed' as const,
      patientName: 'Michael Roberts',
      tasks: ['Meal Prep', 'Mobility Assistance']
    },
  ];

  return (
    <Layout title="Home" role="caregiver">
      <div className="mb-6">
        <div className="bg-primary rounded-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Welcome back, Jane!</h2>
          <p className="opacity-90 mb-4">You have 2 visits scheduled for today.</p>
          <div className="flex">
            <Link to="/caregiver/checklist" className="bg-white text-primary font-medium rounded-lg px-4 py-2 mr-3 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Start Visit
            </Link>
            <Link to="/caregiver/schedule" className="bg-white/20 text-white font-medium rounded-lg px-4 py-2 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              View Schedule
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <h2 className="text-lg font-bold mb-2">Your Next Visit</h2>
        <div className="flex items-start p-4 border-l-4 border-primary bg-blue-50 rounded-r-lg">
          <div className="flex-1">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-primary mr-2" />
              <p className="font-medium text-gray-900">{upcomingVisits[0].time} Today</p>
            </div>
            <p className="mt-1 font-medium text-lg">{upcomingVisits[0].patientName}</p>
            <p className="text-sm text-gray-600">{upcomingVisits[0].duration}</p>
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-500 mb-1">Tasks</p>
              <div className="flex flex-wrap gap-1">
                {upcomingVisits[0].tasks.map((task, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-white rounded-full px-2 py-0.5 border border-gray-200"
                  >
                    {task}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex">
              <button className="bg-primary text-white font-medium rounded-lg px-4 py-2 mr-3">
                Start Visit
              </button>
              <button className="bg-gray-100 text-gray-700 font-medium rounded-lg px-4 py-2">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-bold mb-3">Upcoming Visits</h2>
          <div className="space-y-4">
            {upcomingVisits.map((visit) => (
              <VisitCard key={visit.id} visit={visit} role="caregiver" />
            ))}
            <Link to="/caregiver/schedule" className="block w-full py-2 text-primary font-medium text-center border border-primary rounded-lg hover:bg-primary/5">
              View Full Schedule
            </Link>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-bold mb-3">Recent Visits</h2>
          <div className="space-y-4">
            {recentVisits.map((visit) => (
              <VisitCard key={visit.id} visit={visit} role="caregiver" />
            ))}
            <Link to="/caregiver/schedule" className="block w-full py-2 text-primary font-medium text-center border border-primary rounded-lg hover:bg-primary/5">
              View All Visits
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaregiverDashboard;
