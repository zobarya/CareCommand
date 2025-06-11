
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Clock, Star, Brain } from 'lucide-react';

interface CaregiverSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  visit: any;
  onAssign: (visitId: string, caregiverId: string, timeSlot: string) => void;
}

const CaregiverSuggestionsModal: React.FC<CaregiverSuggestionsModalProps> = ({
  isOpen,
  onClose,
  visit,
  onAssign,
}) => {
  // Mock data for AI suggestions
  const suggestedCaregivers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      photo: '/placeholder.svg',
      specializations: ['RN', 'Wound Care', 'Medication Management'],
      region: 'North',
      assignedHours: 28,
      maxHours: 40,
      matchScore: 'good',
      rating: 4.8,
      distance: '2.3 miles',
      availability: 'Available',
    },
    {
      id: '2',
      name: 'Michael Chen',
      photo: '/placeholder.svg',
      specializations: ['LPN', 'Physical Therapy', 'Mobility'],
      region: 'North',
      assignedHours: 35,
      maxHours: 40,
      matchScore: 'fair',
      rating: 4.6,
      distance: '4.1 miles',
      availability: 'Available',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      photo: '/placeholder.svg',
      specializations: ['CNA', 'Personal Care', 'Companionship'],
      region: 'Central',
      assignedHours: 38,
      maxHours: 40,
      matchScore: 'poor',
      rating: 4.4,
      distance: '6.8 miles',
      availability: 'Limited',
    },
  ];

  const getMatchScoreColor = (score: string) => {
    switch (score) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage < 75) return 'bg-green-500';
    if (percentage < 95) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!visit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>AI-Powered Caregiver Suggestions</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="font-medium">{visit.patientName}</p>
          <p className="text-sm text-gray-600">
            {visit.serviceType} • {visit.startTime} • {visit.duration} minutes
          </p>
        </div>
        
        <div className="space-y-4">
          {suggestedCaregivers.map((caregiver) => {
            const utilizationPercentage = (caregiver.assignedHours / caregiver.maxHours) * 100;
            
            return (
              <div key={caregiver.id} className="border rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={caregiver.photo}
                    alt={caregiver.name}
                    className="w-12 h-12 rounded-full"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{caregiver.name}</h4>
                      <Badge className={getMatchScoreColor(caregiver.matchScore)}>
                        {caregiver.matchScore} match
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {caregiver.specializations.map((spec) => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{caregiver.region} • {caregiver.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{caregiver.rating}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Workload: {caregiver.assignedHours}/{caregiver.maxHours} hours</span>
                        <span>{Math.round(utilizationPercentage)}%</span>
                      </div>
                      <Progress 
                        value={utilizationPercentage} 
                        className="h-2"
                        style={{
                          background: `linear-gradient(to right, ${getUtilizationColor(utilizationPercentage)} 0%, ${getUtilizationColor(utilizationPercentage)} ${utilizationPercentage}%, #e5e7eb ${utilizationPercentage}%, #e5e7eb 100%)`
                        }}
                      />
                    </div>
                    
                    <Button 
                      onClick={() => onAssign(visit.id, caregiver.id, visit.startTime)}
                      className="w-full"
                      variant={caregiver.matchScore === 'good' ? 'default' : 'outline'}
                    >
                      Assign to Visit
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full">
            View All Caregivers
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaregiverSuggestionsModal;
