
import React, { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import AssignVisitModalContent from './AssignVisitModalContent';

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

  // Optimized form data update handler
  const handleFormDataChange = useCallback((updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

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

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[95vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle>
              Assign Visit {preFilledData.caregiverName && `- ${preFilledData.caregiverName}`}
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto">
            <AssignVisitModalContent
              formData={formData}
              isLoading={isLoading}
              showCaregiverSuggestions={showCaregiverSuggestions}
              onFormDataChange={handleFormDataChange}
              onShowCaregiverSuggestionsChange={setShowCaregiverSuggestions}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Assign Visit {preFilledData.caregiverName && `- ${preFilledData.caregiverName}`}
          </DialogTitle>
        </DialogHeader>
        <AssignVisitModalContent
          formData={formData}
          isLoading={isLoading}
          showCaregiverSuggestions={showCaregiverSuggestions}
          onFormDataChange={handleFormDataChange}
          onShowCaregiverSuggestionsChange={setShowCaregiverSuggestions}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AssignVisitModal;
