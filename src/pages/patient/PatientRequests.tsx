
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Clock, CheckCircle, XCircle, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PatientRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showNewRequestDialog, setShowNewRequestDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const { toast } = useToast();
  
  // Mock data for requests
  const [activeRequests, setActiveRequests] = useState([
    {
      id: 1,
      type: 'Schedule Change',
      description: 'Request to move Friday appointment from 2pm to 4pm',
      status: 'pending',
      dateSubmitted: 'May 22, 2025',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'Medication Refill',
      description: 'Need refill for blood pressure medication',
      status: 'in-review',
      dateSubmitted: 'May 21, 2025',
      priority: 'high'
    }
  ]);
  
  const [completedRequests, setCompletedRequests] = useState([
    {
      id: 3,
      type: 'Caregiver Preference',
      description: 'Requested to have Jane Doe as primary caregiver',
      status: 'approved',
      dateSubmitted: 'May 15, 2025',
      dateCompleted: 'May 17, 2025'
    },
    {
      id: 4,
      type: 'Special Equipment',
      description: 'Requested walker with seat for mobility assistance',
      status: 'denied',
      dateSubmitted: 'May 10, 2025',
      dateCompleted: 'May 12, 2025',
      notes: 'Insurance does not cover this equipment. Alternative options provided.'
    }
  ]);

  // Form state for new request
  const [newRequest, setNewRequest] = useState({
    type: '',
    description: '',
    priority: 'medium'
  });
  
  const handleCreateRequest = () => {
    if (!newRequest.type || !newRequest.description) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    const newRequestObj = {
      id: Date.now(),
      type: newRequest.type,
      description: newRequest.description,
      status: 'pending',
      dateSubmitted: formattedDate,
      priority: newRequest.priority
    };
    
    setActiveRequests([newRequestObj, ...activeRequests]);
    setNewRequest({ type: '', description: '', priority: 'medium' });
    setShowNewRequestDialog(false);
    
    toast({
      title: "Request Submitted",
      description: "Your request has been submitted successfully"
    });
  };
  
  const handleEditRequest = (request: any) => {
    setSelectedRequest(request);
    setNewRequest({
      type: request.type,
      description: request.description,
      priority: request.priority || 'medium'
    });
    setShowNewRequestDialog(true);
  };
  
  const handleUpdateRequest = () => {
    if (!selectedRequest) return;
    
    const updatedRequests = activeRequests.map(req => 
      req.id === selectedRequest.id 
        ? { ...req, type: newRequest.type, description: newRequest.description, priority: newRequest.priority }
        : req
    );
    
    setActiveRequests(updatedRequests);
    setNewRequest({ type: '', description: '', priority: 'medium' });
    setSelectedRequest(null);
    setShowNewRequestDialog(false);
    
    toast({
      title: "Request Updated",
      description: "Your request has been updated successfully"
    });
  };
  
  const handleCancelRequest = (request: any) => {
    // Move to completed with cancelled status
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    const cancelledRequest = {
      ...request,
      status: 'denied',
      dateCompleted: formattedDate,
      notes: 'Cancelled by patient'
    };
    
    setCompletedRequests([cancelledRequest, ...completedRequests]);
    setActiveRequests(activeRequests.filter(req => req.id !== request.id));
    
    toast({
      title: "Request Cancelled",
      description: "Your request has been cancelled"
    });
  };
  
  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setShowDetailsDialog(true);
  };
  
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
    <Layout title="My Requests" role="patient">
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
        <Dialog open={showNewRequestDialog} onOpenChange={setShowNewRequestDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedRequest ? 'Edit Request' : 'New Request'}</DialogTitle>
              <DialogDescription>
                Fill out the details for your request. We'll notify you once it's processed.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Request Type</label>
                <Select 
                  value={newRequest.type} 
                  onValueChange={(value) => setNewRequest({...newRequest, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select request type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Schedule Change">Schedule Change</SelectItem>
                    <SelectItem value="Medication Refill">Medication Refill</SelectItem>
                    <SelectItem value="Caregiver Preference">Caregiver Preference</SelectItem>
                    <SelectItem value="Special Equipment">Special Equipment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Describe your request in detail" 
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select 
                  value={newRequest.priority} 
                  onValueChange={(value) => setNewRequest({...newRequest, priority: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setNewRequest({ type: '', description: '', priority: 'medium' });
                setSelectedRequest(null);
                setShowNewRequestDialog(false);
              }}>
                Cancel
              </Button>
              <Button onClick={selectedRequest ? handleUpdateRequest : handleCreateRequest}>
                {selectedRequest ? 'Update Request' : 'Submit Request'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  <p className="text-sm text-gray-600 mb-3">{request.description}</p>
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 md:flex-auto"
                    onClick={() => handleEditRequest(request)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 md:flex-auto text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50"
                    onClick={() => handleCancelRequest(request)}
                  >
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
                  <p className="text-sm text-gray-600 mb-3">{request.description}</p>
                  {request.notes && (
                    <p className="text-sm bg-gray-50 p-2 rounded mb-3">
                      <span className="font-medium">Note:</span> {request.notes}
                    </p>
                  )}
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(request)}
                >
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

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Request Type</h3>
                <p>{selectedRequest.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p>{selectedRequest.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Submitted</h3>
                  <p>{selectedRequest.dateSubmitted}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                  <p>{selectedRequest.dateCompleted}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <div className="mt-1">{renderStatusBadge(selectedRequest.status)}</div>
              </div>
              {selectedRequest.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p className="bg-gray-50 p-3 rounded mt-1">{selectedRequest.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default PatientRequests;
