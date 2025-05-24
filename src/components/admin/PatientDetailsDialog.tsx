
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Calendar, Heart, UserCheck, Clock } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  carePlan: string;
  status: string;
  caregiver: string;
  nextVisit: string;
}

interface PatientDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: Patient | null;
}

const PatientDetailsDialog: React.FC<PatientDetailsDialogProps> = ({ 
  open, 
  onOpenChange, 
  patient 
}) => {
  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent mx-auto mb-3">
              <User className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">{patient.name}</h3>
            <p className="text-gray-600">{patient.age} years old</p>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Heart className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-700">Care Plan</p>
                <p className="text-gray-900">{patient.carePlan}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                patient.status === 'Active' 
                  ? 'bg-green-500' 
                  : 'bg-gray-400'
              }`} />
              <div>
                <p className="text-sm font-medium text-gray-700">Status</p>
                <p className="text-gray-900">{patient.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <UserCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-700">Primary Caregiver</p>
                <p className="text-gray-900">{patient.caregiver}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-700">Next Visit</p>
                <p className="text-gray-900">{patient.nextVisit}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsDialog;
