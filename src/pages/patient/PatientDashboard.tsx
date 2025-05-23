
import React from 'react';
import { Calendar, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import VisitCard from '@/components/ui/visit-card';
import { Button } from '@/components/ui/button';

const PatientDashboard: React.FC = () => {
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

  return (
    <Layout title="Home" role="patient">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Upcoming Care Visit</h2>
          <Link to="/patient/visits" className="text-sm text-primary font-medium hover:underline">
            View All
          </Link>
        </div>
        <div className="p-4 border border-primary/20 rounded-lg bg-blue-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-primary font-medium">TODAY</p>
              <p className="text-xl font-bold mt-1">{upcomingVisits[0].time}</p>
              <p className="text-gray-600">{upcomingVisits[0].duration}</p>
            </div>
            <div className="mt-3 md:mt-0">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">{upcomingVisits[0].caregiverName}</p>
                  <p className="text-sm text-gray-600">Your caregiver</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-500 mb-1">Services</p>
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
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
            <h2 className="text-lg font-bold mb-3">Your Care Summary</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-xs text-gray-600">Upcoming Visits</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">12</p>
                <p className="text-xs text-gray-600">Completed Visits</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-accent">4</p>
                <p className="text-xs text-gray-600">Care Team Members</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Your Care Plan</h2>
              <Link to="/patient/care-plan" className="text-sm text-primary font-medium hover:underline">
                View Details
              </Link>
            </div>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                <p className="font-medium">Medication Management</p>
                <p className="text-sm text-gray-600">3 times daily</p>
              </div>
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                <p className="font-medium">Physical Therapy</p>
                <p className="text-sm text-gray-600">Monday, Wednesday, Friday</p>
              </div>
              <div className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                <p className="font-medium">Vital Signs Monitoring</p>
                <p className="text-sm text-gray-600">Daily</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button className="w-full text-left justify-start" asChild>
                <Link to="/patient/requests">
                  <Calendar className="h-5 w-5 mr-2" />
                  Request New Visit
                </Link>
              </Button>
              <Button className="w-full text-left justify-start" asChild>
                <Link to="/patient/messages">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Contact Care Team
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h2 className="text-lg font-bold mb-3">Your Caregivers</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">Jane Doe, RN</p>
                  <p className="text-sm text-gray-600">Primary Nurse</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <User className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">Mike Johnson, HHA</p>
                  <p className="text-sm text-gray-600">Home Health Aide</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <User className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">Dr. Wilson</p>
                  <p className="text-sm text-gray-600">Supervising Physician</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
