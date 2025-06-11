
import React, { useCallback } from 'react';
import { User, Calendar, Clock, MapPin, FileText, Users, Brain, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AssignVisitModalContentProps {
  formData: any;
  isLoading: boolean;
  showCaregiverSuggestions: boolean;
  onFormDataChange: (updates: any) => void;
  onShowCaregiverSuggestionsChange: (show: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const AssignVisitModalContent: React.FC<AssignVisitModalContentProps> = React.memo(({
  formData,
  isLoading,
  showCaregiverSuggestions,
  onFormDataChange,
  onShowCaregiverSuggestionsChange,
  onSubmit,
  onCancel,
}) => {
  const mockPatients = [
    { id: 'p1', name: 'John Smith', photo: '/placeholder.svg', region: 'North' },
    { id: 'p2', name: 'Emma Wilson', photo: '/placeholder.svg', region: 'Central' },
    { id: 'p3', name: 'Robert Brown', photo: '/placeholder.svg', region: 'South' },
  ];

  const mockCaregivers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'RN',
      photo: '/placeholder.svg',
      assignedHours: 28,
      maxHours: 40,
      matchScore: 92,
      matchQuality: 'high',
      tags: ['Region Match', 'Specialization', 'Available'],
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'LPN',
      photo: '/placeholder.svg',
      assignedHours: 35,
      maxHours: 40,
      matchScore: 76,
      matchQuality: 'good',
      tags: ['Specialization', 'Near Full Capacity'],
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'CNA',
      photo: '/placeholder.svg',
      assignedHours: 38,
      maxHours: 40,
      matchScore: 45,
      matchQuality: 'low',
      tags: ['Available', 'Different Region'],
    },
  ];

  // Memoized handlers to prevent re-renders
  const handlePatientChange = useCallback((value: string) => {
    onFormDataChange({ patient: value });
  }, [onFormDataChange]);

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFormDataChange({ date: e.target.value });
  }, [onFormDataChange]);

  const handleStartTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFormDataChange({ startTime: e.target.value });
  }, [onFormDataChange]);

  const handleDurationChange = useCallback((value: string) => {
    onFormDataChange({ duration: value });
  }, [onFormDataChange]);

  const handleServiceTypeChange = useCallback((value: string) => {
    onFormDataChange({ serviceType: value });
  }, [onFormDataChange]);

  const handleRegionChange = useCallback((value: string) => {
    onFormDataChange({ region: value });
  }, [onFormDataChange]);

  const handleInstructionsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onFormDataChange({ instructions: e.target.value });
  }, [onFormDataChange]);

  const handleCaregiverSelect = useCallback((caregiverId: string) => {
    onFormDataChange({ caregiverId });
  }, [onFormDataChange]);

  const getMatchQualityBadge = (quality: string, score: number) => {
    const variants = {
      high: { color: 'bg-green-500 text-white', label: 'High Match' },
      good: { color: 'bg-yellow-500 text-white', label: 'Good Match' },
      low: { color: 'bg-red-500 text-white', label: 'Low Match' },
    };
    
    const variant = variants[quality as keyof typeof variants] || variants.good;
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge className={variant.color}>
              {variant.label} ({score}%)
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Match based on specialization, location, and availability</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="space-y-6 font-['Inter']">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Patient Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-2">Patient Information</h3>
          
          <div className="space-y-3">
            <Label htmlFor="patient" className="flex items-center gap-2 text-sm font-medium mb-2">
              <User className="w-4 h-4" />
              Patient *
            </Label>
            <Select value={formData.patient} onValueChange={handlePatientChange}>
              <SelectTrigger id="patient">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={patient.photo} alt={patient.name} />
                        <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {patient.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="region" className="flex items-center gap-2 text-sm font-medium mb-2">
              <MapPin className="w-4 h-4" />
              Region
            </Label>
            <Select value={formData.region} onValueChange={handleRegionChange}>
              <SelectTrigger id="region">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north">North</SelectItem>
                <SelectItem value="central">Central</SelectItem>
                <SelectItem value="south">South</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Visit Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-2">Visit Details</h3>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="date" className="flex items-center gap-2 text-sm font-medium mb-2">
                <Calendar className="w-4 h-4" />
                Visit Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleDateChange}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="startTime" className="flex items-center gap-2 text-sm font-medium mb-2">
                <Clock className="w-4 h-4" />
                Start Time *
              </Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleStartTimeChange}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="duration" className="text-sm font-medium mb-2 block">Duration</Label>
              <Select value={formData.duration} onValueChange={handleDurationChange}>
                <SelectTrigger id="duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="serviceType" className="text-sm font-medium mb-2 block">Service Type *</Label>
              <Select value={formData.serviceType} onValueChange={handleServiceTypeChange}>
                <SelectTrigger id="serviceType">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wound-care">Wound Care</SelectItem>
                  <SelectItem value="medication-management">Medication Management</SelectItem>
                  <SelectItem value="personal-care">Personal Care</SelectItem>
                  <SelectItem value="companionship">Companionship</SelectItem>
                  <SelectItem value="physical-therapy">Physical Therapy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Special Instructions Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b pb-2">Additional Information</h3>
          
          <div className="space-y-3">
            <Label htmlFor="instructions" className="flex items-center gap-2 text-sm font-medium mb-2">
              <FileText className="w-4 h-4" />
              Special Instructions
            </Label>
            <Textarea
              id="instructions"
              key="special-instructions-textarea"
              placeholder="Enter any special instructions..."
              value={formData.instructions}
              onChange={handleInstructionsChange}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>

        {/* Caregiver Assignment Section - At Bottom */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-lg font-semibold text-foreground">Caregiver Assignment</h3>
            <div className="flex items-center space-x-2">
              <Switch
                id="assign-caregiver"
                checked={showCaregiverSuggestions}
                onCheckedChange={onShowCaregiverSuggestionsChange}
              />
              <Label htmlFor="assign-caregiver" className="flex items-center gap-2 text-sm font-medium">
                <Users className="w-4 h-4" />
                Assign Caregiver?
              </Label>
            </div>
          </div>

          {showCaregiverSuggestions && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
                <Brain className="w-5 h-5 text-primary" />
                <h4 className="font-medium text-sm">
                  Looking for: {formData.serviceType || 'Service'} in {formData.region}
                </h4>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {mockCaregivers.map((caregiver) => (
                  <div
                    key={caregiver.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      formData.caregiverId === caregiver.id ? 'border-primary bg-primary/5 shadow-md' : 'hover:bg-muted/30'
                    }`}
                    onClick={() => handleCaregiverSelect(caregiver.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-12 h-12 flex-shrink-0">
                        <AvatarImage src={caregiver.photo} alt={caregiver.name} />
                        <AvatarFallback>{caregiver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-sm">{caregiver.name}</p>
                            <p className="text-xs text-muted-foreground">{caregiver.role}</p>
                          </div>
                          {getMatchQualityBadge(caregiver.matchQuality, caregiver.matchScore)}
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {caregiver.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{caregiver.assignedHours}/{caregiver.maxHours} hours</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>4.8</span>
                          </div>
                        </div>
                        
                        <Button
                          type="button"
                          size="sm"
                          className="w-full mt-3"
                          variant={formData.caregiverId === caregiver.id ? 'default' : 'outline'}
                        >
                          {formData.caregiverId === caregiver.id ? 'Selected' : 'Assign Caregiver'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full sm:flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !formData.patient || !formData.serviceType}
            className="w-full sm:flex-1"
          >
            {isLoading ? 'Creating Visit...' : 'Create Visit'}
          </Button>
        </div>
      </form>
    </div>
  );
});

AssignVisitModalContent.displayName = 'AssignVisitModalContent';

export default AssignVisitModalContent;
