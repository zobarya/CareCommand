
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Clock, CheckCircle, XCircle, Calendar, User } from 'lucide-react';

const FamilyRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  // Mock data for requests
  const activeRequests = [
    {
      id: 1,
      type: 'Schedule Change',
      description: 'Request to add an additional visit on weekends for my father',
      status: 'pending',
      dateSubmitted: 'May 21, 2025',
      patient: 'Robert Smith (Father)',
      priority: 'high'
    },
    {
      id: 2,
      type: 'Caregiver Preference',
      description: 'Request to have Jane Doe as primary caregiver for all visits',
      status: 'in-review',
      dateSubmitted: 'May 19, 2025',
      patient: 'Robert Smith (Father)',
      priority: 'medium'
    }
  ];
  
  const completedRequests = [
    {
      id: 3,
      type: 'Medical Equipment',
      description: 'Request for grab bars to be installed in bathroom',
      status: 'approved',
      dateSubmitted: 'May 10, 2025',
      dateCompleted: 'May 15, 2025',
      patient: 'Robert Smith (Father)'
    },
    {
      id: 4,
      type: 'Care Plan Change',
      description: 'Request to include daily blood pressure monitoring in care plan',
      status: 'approved',
      dateSubmitted: 'May 5, 2025',
      dateCompleted: 'May 8, 2025',
      patient: 'Robert Smith (Father)'
    }
  ];
  
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </span>
        );
      case 'in-review':
        return (
          <span className="flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            <User className="h-3 w-3 mr-1" /> In Review
          </span>
        );
      case 'approved':
        return (
          <span className="flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            <CheckCircle className="h-3 w-3 mr-1" /> Approved
          </span>
        );
      case 'denied':
        return (
          <span className="flex items-center text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
            <XCircle className="h-3 w-3 mr-1" /> Denied
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <Layout title="Care Requests" role="family">
      <div className="flex justify-between mb-6">
        <div className="flex space-x-1">
          <Button 
            variant={activeTab === 'active' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('active')}
            className="relative"
          >
            Active
            {activeRequests.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeRequests.length}
              </span>
            )}
          </Button>
          <Button 
            variant={activeTab === 'completed' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </Button>
        </div>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>
      
      {activeTab === 'active' ? (
        <div className="space-y-4">
          {activeRequests.map((request) => (
            <Card key={request.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{request.type}</h3>
                    {request.priority === 'high' && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
                        High Priority
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                  <p className="text-sm text-gray-600 mb-3">For: {request.patient}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 gap-y-1 gap-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Submitted: {request.dateSubmitted}</span>
                    </div>
                    <div>
                      {renderStatusBadge(request.status)}
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col gap-2">
                  <Button variant="outline" size="sm" className="flex-1 md:flex-auto">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 md:flex-auto text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50">
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {activeRequests.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No active requests</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {completedRequests.map((request) => (
            <Card key={request.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-grow">
                  <h3 className="font-medium mb-2">{request.type}</h3>
                  <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                  <p className="text-sm text-gray-600 mb-3">For: {request.patient}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 gap-y-1 gap-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Submitted: {request.dateSubmitted}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Completed: {request.dateCompleted}</span>
                    </div>
                    <div>
                      {renderStatusBadge(request.status)}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
          
          {completedRequests.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No completed requests</p>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default FamilyRequests;
