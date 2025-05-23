
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Calendar, User, MessageCircle, Plus, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define proper types for our feedback items
interface BaseFeedback {
  id: number;
  caregiverName: string;
  caregiverRole: string;
  date: string;
  visitType: string;
}

interface PendingFeedback extends BaseFeedback {}

interface GivenFeedback extends BaseFeedback {
  rating: number;
  comment: string;
}

const PatientFeedback: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const navigate = useNavigate();
  
  // Mock data for feedback with proper typing
  const pendingFeedback: PendingFeedback[] = [
    {
      id: 1,
      caregiverName: 'Jane Doe',
      caregiverRole: 'Registered Nurse',
      date: 'May 22, 2025',
      visitType: 'Weekly Check-up'
    },
    {
      id: 2,
      caregiverName: 'Thomas Brown',
      caregiverRole: 'Physical Therapist',
      date: 'May 20, 2025',
      visitType: 'Physical Therapy'
    }
  ];
  
  const givenFeedback: GivenFeedback[] = [
    {
      id: 3,
      caregiverName: 'Sarah Wilson',
      caregiverRole: 'Home Health Aide',
      date: 'May 18, 2025',
      visitType: 'Daily Assistance',
      rating: 5,
      comment: 'Sarah was very helpful and kind. She helped me with my daily routine and made sure I was comfortable.'
    },
    {
      id: 4,
      caregiverName: 'Michael Johnson',
      caregiverRole: 'Physical Therapist',
      date: 'May 15, 2025',
      visitType: 'Physical Therapy Session',
      rating: 4,
      comment: 'Michael was professional and knowledgeable. The exercises were helpful but a bit challenging.'
    }
  ];
  
  // State for feedback form
  const [activeFeedback, setActiveFeedback] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState<number[]>([]);

  const handleProvideFeedback = (id: number) => {
    setActiveFeedback(id);
    setRating(0);
    setComment('');
  };

  const handleSubmitFeedback = () => {
    if (activeFeedback && rating > 0) {
      console.log('Submitting feedback:', { id: activeFeedback, rating, comment });
      setSubmittedFeedback(prev => [...prev, activeFeedback]);
      setActiveFeedback(null);
      setRating(0);
      setComment('');
    }
  };

  const handleCancelFeedback = () => {
    setActiveFeedback(null);
    setRating(0);
    setComment('');
  };
  
  const renderStars = (active: number, total: number = 5) => {
    return Array(total).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-6 w-6 ${i < active ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
        onClick={() => activeFeedback && setRating(i + 1)}
      />
    ));
  };

  // Helper function to type check if a feedback item has a rating
  const hasRating = (feedback: BaseFeedback): feedback is GivenFeedback => {
    return 'rating' in feedback;
  };

  return (
    <Layout title="Caregiver Feedback" role="patient">
      <div className="flex space-x-1 mb-6">
        <Button 
          variant={activeTab === 'pending' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('pending')}
          className="relative"
        >
          Pending
          {pendingFeedback.filter(f => !submittedFeedback.includes(f.id)).length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {pendingFeedback.filter(f => !submittedFeedback.includes(f.id)).length}
            </span>
          )}
        </Button>
        <Button 
          variant={activeTab === 'given' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('given')}
        >
          Given
        </Button>
      </div>
      
      {activeTab === 'pending' ? (
        <div className="space-y-4">
          {pendingFeedback
            .filter(f => !submittedFeedback.includes(f.id))
            .map((feedback) => (
              <React.Fragment key={feedback.id}>
                {activeFeedback === feedback.id ? (
                  <Card className="p-6">
                    <div className="flex items-start mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{feedback.caregiverName}</h3>
                        <p className="text-sm text-gray-500">{feedback.caregiverRole}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{feedback.date} - {feedback.visitType}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <Label className="block mb-2">How would you rate your experience?</Label>
                        <div className="flex space-x-2">
                          {renderStars(rating)}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="comment" className="block mb-2">Additional comments (optional)</Label>
                        <Textarea 
                          id="comment" 
                          placeholder="Share your experience with this caregiver..." 
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button 
                          onClick={handleSubmitFeedback}
                          disabled={rating === 0}
                        >
                          Submit Feedback
                        </Button>
                        <Button variant="outline" onClick={handleCancelFeedback}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-start mb-2">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{feedback.caregiverName}</h3>
                            <p className="text-xs text-gray-500">{feedback.caregiverRole}</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 flex">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{feedback.date} - {feedback.visitType}</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleProvideFeedback(feedback.id)} 
                        className="flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Provide Feedback
                      </Button>
                    </div>
                  </Card>
                )}
              </React.Fragment>
            ))}
          
          {pendingFeedback.filter(f => !submittedFeedback.includes(f.id)).length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">All caught up!</h3>
              <p className="text-gray-500">You've provided feedback for all your recent visits.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {[...givenFeedback, ...pendingFeedback.filter(f => submittedFeedback.includes(f.id))].map((feedback) => (
            <Card key={feedback.id} className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
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
                  <p className="text-xs text-gray-500 mb-3">
                    Visit type: {feedback.visitType}
                  </p>
                  
                  {hasRating(feedback) && (
                    <div className="flex items-center">
                      {renderStars(feedback.rating, 5)}
                    </div>
                  )}
                </div>
                
                {hasRating(feedback) && (
                  <div className="md:w-2/3">
                    <div className="bg-gray-50 p-4 rounded-lg relative">
                      <MessageCircle className="h-4 w-4 text-primary absolute -top-2 -left-2" />
                      <h4 className="font-medium mb-2">Your Feedback</h4>
                      <p className="text-sm text-gray-600">{feedback.comment}</p>
                    </div>
                  </div>
                )}
                
                {!hasRating(feedback) && submittedFeedback.includes(feedback.id) && (
                  <div className="md:w-2/3 flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Feedback submitted</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
          
          {givenFeedback.length === 0 && submittedFeedback.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No feedback given yet</h3>
              <p className="text-gray-500">
                You haven't provided any feedback for your caregivers.
              </p>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default PatientFeedback;
