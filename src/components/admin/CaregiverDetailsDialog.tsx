
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Clock, MapPin, Award, Activity, Users } from 'lucide-react';

interface Caregiver {
  id: string;
  name: string;
  role: string;
  specialty: string;
  status: string;
  patients: number;
  availability: string;
  region: string;
  assignedHours: number;
  maxHours: number;
  visits: number;
  photo: string;
}

interface CaregiverDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caregiver: Caregiver | null;
}

const CaregiverDetailsDialog: React.FC<CaregiverDetailsDialogProps> = ({ 
  open, 
  onOpenChange, 
  caregiver 
}) => {
  if (!caregiver) return null;

  const workloadPercentage = caregiver.maxHours ? (caregiver.assignedHours / caregiver.maxHours) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Caregiver Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-3">
              <span className="text-lg font-semibold">{caregiver.photo}</span>
            </div>
            <h3 className="text-xl font-semibold">{caregiver.name}</h3>
            <p className="text-gray-600">{caregiver.role}</p>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-700">Specialty</p>
                <p className="text-gray-900">{caregiver.specialty}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                caregiver.status === 'Active' 
                  ? 'bg-green-500' 
                  : 'bg-gray-400'
              }`} />
              <div>
                <p className="text-sm font-medium text-gray-700">Status</p>
                <p className="text-gray-900">{caregiver.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-700">Region</p>
                <p className="text-gray-900">{caregiver.region}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-700">Availability</p>
                <p className="text-gray-900">{caregiver.availability}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-700">Active Patients</p>
                <p className="text-gray-900">{caregiver.patients}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Activity className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-700">Workload</p>
                <p className="text-gray-900">{caregiver.assignedHours}h / {caregiver.maxHours}h ({Math.round(workloadPercentage)}%)</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className={`h-2 rounded-full ${
                      workloadPercentage >= 95 ? 'bg-red-500' : 
                      workloadPercentage >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(workloadPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaregiverDetailsDialog;
