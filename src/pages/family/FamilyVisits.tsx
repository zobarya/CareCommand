
import React, { useState } from 'react';
import { Calendar, MessageSquare, Search, ThumbsUp } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatusBadge from '@/components/ui/status-badge';

const FamilyVisits: React.FC = () => {
  // Mock data
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  
  const upcomingVisits = [
    {
      id: '1',
      date: 'Today',
      time: '9:00 AM',
      duration: '1 hour',
      status: 'scheduled' as const,
      caregiverName: 'Jane Doe, RN',
      tasks: ['Medication', 'Vitals', 'Exercises']
    },
    {
      id: '2',
      date: 'Friday, May 26',
      time: '11:30 AM',
      duration: '45 min',
      status: 'scheduled' as const,
      caregiverName: 'Mike Johnson, HHA',
      tasks: ['Bathing', 'Meal Prep', 'Light Cleaning']
    },
  ];
  
  const pastVisits = [
    {
      id: '3',
      date: 'Yesterday',
      time: '2:00 PM',
      duration: '1 hour',
      status: 'completed' as const,
      caregiverName: 'Jane Doe, RN',
      tasks: ['Medication', 'Vitals', 'Physical Therapy'],
      hasFeedback: true
    },
    {
      id: '4',
      date: 'May 21',
      time: '10:30 AM',
      duration: '45 min',
      status: 'completed' as const,
      caregiverName: 'Mike Johnson, HHA',
      tasks: ['Meal Prep', 'Mobility Assistance'],
      hasFeedback: false
    },
  ];

  const allVisits = [...upcomingVisits, ...pastVisits].sort((a, b) => {
    // Simple sort - in a real app, would need proper date parsing
    if (a.date === 'Today') return -1;
    if (b.date === 'Today') return 1;
    if (a.date === 'Tomorrow') return -1;
    if (b.date === 'Tomorrow') return 1;
    if (a.date === 'Yesterday') return 1;
    if (b.date === 'Yesterday') return -1;
    return 0;
  });
  
  const filteredVisits = filter === 'all' ? allVisits :
                         filter === 'upcoming' ? upcomingVisits : pastVisits;

  return (
    <Layout title="Visit Summary" role="family">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Patient: John Smith</h2>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search visits..." 
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'upcoming' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'past' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setFilter('past')}
          >
            Past
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="space-y-6">
          {filteredVisits.map((visit: any) => (
            <div key={visit.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{visit.date} - {visit.time}</h3>
                      <StatusBadge status={visit.status} className="ml-3" />
                    </div>
                    <p className="text-sm text-gray-600">{visit.duration} with {visit.caregiverName}</p>
                  </div>
                </div>
                <div className="mt-3 md:mt-0 flex items-center gap-2">
                  {visit.status === 'completed' && !visit.hasFeedback && (
                    <button className="flex items-center text-primary hover:underline text-sm font-medium px-3 py-1 border border-primary rounded-lg">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Provide Feedback
                    </button>
                  )}
                  <button className="text-gray-600 hover:text-primary text-sm font-medium">
                    {visit.status === 'completed' ? 'View Details' : 'Manage Visit'}
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-xs font-medium text-gray-500 mb-2">Services</h4>
                <div className="flex flex-wrap gap-1">
                  {visit.tasks.map((task: string, i: number) => (
                    <span key={i} className="text-xs bg-white border border-gray-200 rounded-full px-2 py-0.5">
                      {task}
                    </span>
                  ))}
                </div>
                {visit.status === 'completed' && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h4 className="text-xs font-medium text-gray-500 mb-2">Visit Summary</h4>
                    <p className="text-sm text-gray-600">
                      All planned services were completed successfully. Patient was comfortable 
                      and responsive throughout the visit. No immediate concerns to report.
                    </p>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <button className="text-primary hover:underline text-xs flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Contact Caregiver
                      </button>
                      
                      {visit.hasFeedback && (
                        <div className="flex items-center text-green-600 text-xs">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Feedback Provided
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {filteredVisits.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No visits found</h3>
              <p className="text-gray-500 mt-2">
                {filter === 'upcoming' ? 'There are no upcoming scheduled visits.' : 
                 filter === 'past' ? 'No past visit records were found.' :
                 'No visits match your search criteria.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FamilyVisits;
