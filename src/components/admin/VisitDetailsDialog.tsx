
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, User, UserCheck, MapPin } from 'lucide-react';
import StatusBadge from '@/components/ui/status-badge';

interface Visit {
  id: string;
  date: Date;
  time: string;
  patientName: string;
  caregiverName: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  duration: string;
}

interface VisitDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visit: Visit | null;
}

const VisitDetailsDialog: React.FC<VisitDetailsDialogProps> = ({ 
  open, 
  onOpenChange, 
  visit 
}) => {
  if (!visit) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Visit Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-3">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">{visit.patientName}</h3>
            <p className="text-gray-600">{formatDate(visit.date)}</p>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-700">Time</p>
                <p className="text-gray-900">{visit.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-700">Duration</p>
                <p className="text-gray-900">{visit.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-700">Patient</p>
                <p className="text-gray-900">{visit.patientName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <UserCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-700">Caregiver</p>
                <p className="text-gray-900">{visit.caregiverName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <StatusBadge status={visit.status} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Status</p>
                <p className="text-gray-900 capitalize">{visit.status}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisitDetailsDialog;
