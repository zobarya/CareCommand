import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { X, Clock, MapPin, User, Calendar, FileText, Users, Brain, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AssignVisitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preFilledData: {
    caregiverId: string;
    caregiverName: string;
    date: string;
    startTime: string;
  };
  onAssign: (visitData: any) => void;
}

const AssignVisitModal: React.FC<AssignVisitModalProps> = ({
  open,
  onOpenChange,
  preFilledData,
  onAssign,
}) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [showCaregiverSuggestions, setShowCaregiverSuggestions] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    date: preFilledData.date,
    startTime: preFilledData.startTime,
    duration: '60',
    serviceType: '',
    region: 'north',
    instructions: '',
    caregiverId: preFilledData.caregiverId,
  });

  // Auto-select caregiver when modal opens with pre-filled caregiver data
  useEffect(() => {
    if (open && preFilledData.caregiverId) {
      setShowCaregiverSuggestions(true);
      setFormData(prev => ({
        ...prev,
        caregiverId: preFilledData.caregiverId,
        date: preFilledData.date,
        startTime: preFilledData.startTime,
      }));
    }
  }, [open, preFilledData]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const visitData = {
      ...formData,
      id: `visit-${Date.now()}`,
      patientName: mockPatients.find(p => p.id === formData.patient)?.name || 'Unknown Patient',
      status: showCaregiverSuggestions && formData.caregiverId ? 'scheduled' : 'unassigned',
    };

    onAssign(visitData);
    setIsLoading(false);
    onOpenChange(false);
  };

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

  const ModalContent = () => (
    <div className="space-y-6 font-['Inter']">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="patient" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Patient *
              </Label>
              <Select value={formData.patient} onValueChange={(value) => setFormData(prev => ({ ...prev, patient: value }))}>
                <SelectTrigger>
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

            <div>
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Visit Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Start Time *
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
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
            </div>

            <div>
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select value={formData.serviceType} onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}>
                <SelectTrigger>
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

            <div>
              <Label htmlFor="region" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Region
              </Label>
              <Select value={formData.region} onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="instructions" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Special Instructions
              </Label>
              <Textarea
                id="instructions"
                placeholder="Enter any special instructions..."
                value={formData.instructions}
                onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                rows={4}
              />
            </div>
          </div>

          {/* Right Column - AI Suggestions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="assign-caregiver"
                checked={showCaregiverSuggestions}
                onCheckedChange={setShowCaregiverSuggestions}
              />
              <Label htmlFor="assign-caregiver" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Assign Caregiver?
              </Label>
            </div>

            {showCaregiverSuggestions && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <h4 className="font-medium text-sm">
                    Looking for: {formData.serviceType || 'Service'} in {formData.region}
                  </h4>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {mockCaregivers.map((caregiver) => (
                    <div
                      key={caregiver.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        formData.caregiverId === caregiver.id ? 'border-primary bg-primary/5 shadow-md' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, caregiverId: caregiver.id }))}
                      style={{ fontFamily: 'Inter', fontSize: '8pt' }}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={caregiver.photo} alt={caregiver.name} />
                          <AvatarFallback>{caregiver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium text-sm">{caregiver.name}</p>
                              <p className="text-xs text-gray-600">{caregiver.role}</p>
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
                          
                          <div className="flex items-center justify-between text-xs text-gray-600">
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
        </div>

        <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !formData.patient || !formData.serviceType}
            className="flex-1"
          >
            {isLoading ? 'Creating Visit...' : 'Create Visit'}
          </Button>
        </div>
      </form>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>
              Assign Visit {preFilledData.caregiverName && `- ${preFilledData.caregiverName}`}
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto">
            <ModalContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Assign Visit {preFilledData.caregiverName && `- ${preFilledData.caregiverName}`}
          </DialogTitle>
        </DialogHeader>
        <ModalContent />
      </DialogContent>
    </Dialog>
  );
};

export default AssignVisitModal;
