
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Calendar, User, MessageCircle, Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const FamilyFeedback: React.FC = () => {
  const [activeTab, setActiveTab] = useState('given');
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Mock data for feedback
  const givenFeedback = [
    {
      id: 1,
      caregiverName: 'Jane Doe',
      caregiverRole: 'Registered Nurse',
      date: 'May 18, 2025',
      visitType: 'Weekly Check-up',
      patient: 'Robert Smith (Father)',
      rating: 5,
      comment: 'Jane has been extremely attentive to my father\'s needs. She explains his medication routine clearly and always answers our questions thoroughly.',
    },
    {
      id: 2,
      caregiverName: 'Michael Johnson',
      caregiverRole: 'Physical Therapist',
      date: 'May 10, 2025',
      visitType: 'Physical Therapy Session',
      patient: 'Robert Smith (Father)',
      rating: 4,
      comment: 'Michael is helping my father make good progress with his mobility. His exercises are well-planned, though occasionally he seems a bit rushed.',
    }
  ];
  
  const pendingFeedback = [
    {
      id: 3,
      caregiverName: 'Sarah Wilson',
      caregiverRole: 'Home Health Aide',
      date: 'May 22, 2025',
      visitType: 'Daily Assistance',
      patient: 'Robert Smith (Father)',
    },
    {
      id: 4,
      caregiverName: 'Thomas Brown',
      caregiverRole: 'Occupational Therapist',
      date: 'May 20, 2025',
      visitType: 'Therapy Session',
      patient: 'Robert Smith (Father)',
    }
  ];
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const handleProvideFeedback = (id: number) => {
    // In a real app, this would navigate to a form to provide feedback for the specific visit
    console.log(`Providing feedback for visit ${id}`);
    // For demo purposes, let's navigate to the messages page
    navigate('/family/messages');
  };
  
  return (
    <Layout title="Caregiver Feedback" role="family">
      <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} mb-6`}>
        <div className={`flex ${isMobile ? 'w-full mb-3' : 'space-x-1'}`}>
          <Button 
            variant={activeTab === 'given' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('given')}
            className={isMobile ? 'flex-1' : ''}
          >
            Given Feedback
          </Button>
          <Button 
            variant={activeTab === 'pending' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('pending')}
            className={`relative ${isMobile ? 'flex-1' : ''}`}
          >
            Pending
            {pendingFeedback.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingFeedback.length}
              </span>
            )}
          </Button>
        </div>
      </div>
      
      {activeTab === 'given' ? (
        <div className="space-y-4">
          {givenFeedback.map((feedback) => (
            <Card key={feedback.id} className="p-4">
              <div className={`flex flex-col ${!isMobile ? 'md:flex-row' : ''} gap-4`}>
                <div className={isMobile ? '' : 'md:w-1/4'}>
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{feedback.caregiverName}</h3>
                      <p className="text-xs text-gray-500">{feedback.caregiverRole}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 flex mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{feedback.date}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    Visit type: {feedback.visitType}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    For: {feedback.patient}
                  </p>
                  <div className="flex items-center">
                    {renderStars(feedback.rating)}
                  </div>
                </div>
                
                <div className={isMobile ? '' : 'md:w-3/4'}>
                  <div className="bg-gray-50 p-4 rounded-lg relative">
                    <MessageCircle className="h-4 w-4 text-primary absolute -top-2 -left-2" />
                    <h4 className="font-medium mb-2">Your Feedback</h4>
                    <p className="text-sm text-gray-600">{feedback.comment}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          {givenFeedback.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No feedback given yet</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {pendingFeedback.map((feedback) => (
            <Card key={feedback.id} className="p-4">
              <div className={`flex ${isMobile ? 'flex-col' : 'md:flex-row md:items-center md:justify-between'} gap-4`}>
                <div className="flex-grow">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{feedback.caregiverName}</h3>
                      <p className="text-xs text-gray-500">{feedback.caregiverRole}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 flex mb-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{feedback.date}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    Visit type: {feedback.visitType}
                  </p>
                  <p className="text-xs text-gray-500">
                    For: {feedback.patient}
                  </p>
                </div>
                <div className={isMobile ? 'w-full' : ''}>
                  <Button 
                    onClick={() => handleProvideFeedback(feedback.id)} 
                    className={`flex items-center ${isMobile ? 'w-full' : ''}`}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Provide Feedback
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {pendingFeedback.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No pending feedback requests</p>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default FamilyFeedback;
