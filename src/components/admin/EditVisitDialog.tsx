
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Visit {
  id: string;
  date: Date;
  time: string;
  patientName: string;
  caregiverName: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  duration: string;
}

interface EditVisitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visit: Visit | null;
  onUpdate: (updatedVisit: Visit) => void;
}

const EditVisitDialog: React.FC<EditVisitDialogProps> = ({ 
  open, 
  onOpenChange, 
  visit, 
  onUpdate 
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    caregiverName: '',
    date: '',
    time: '',
    duration: '',
    status: 'scheduled' as 'scheduled' | 'completed' | 'cancelled',
  });

  useEffect(() => {
    if (visit) {
      setFormData({
        patientName: visit.patientName,
        caregiverName: visit.caregiverName,
        date: visit.date.toISOString().split('T')[0],
        time: visit.time,
        duration: visit.duration,
        status: visit.status,
      });
    }
  }, [visit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const patients = [
    'John Smith',
    'Emma Wilson',
    'Robert Brown',
    'Sarah Johnson'
  ];

  const caregivers = [
    'Jane Doe, RN',
    'Mike Johnson, HHA',
    'Sarah Williams, LPN'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (visit) {
      const updatedVisit: Visit = {
        ...visit,
        patientName: formData.patientName,
        caregiverName: formData.caregiverName,
        date: new Date(formData.date),
        time: formData.time,
        duration: formData.duration,
        status: formData.status,
      };
      onUpdate(updatedVisit);
      toast.success('Visit updated successfully');
      onOpenChange(false);
    }
  };

  if (!visit) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Visit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="patientName">Patient</Label>
              <select 
                id="patientName" 
                name="patientName" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.patientName}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a patient</option>
                {patients.map(patient => (
                  <option key={patient} value={patient}>
                    {patient}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="caregiverName">Caregiver</Label>
              <select 
                id="caregiverName" 
                name="caregiverName" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.caregiverName}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a caregiver</option>
                {caregivers.map(caregiver => (
                  <option key={caregiver} value={caregiver}>
                    {caregiver}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                name="date" 
                type="date" 
                value={formData.date}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <Input 
                id="time" 
                name="time" 
                value={formData.time}
                onChange={handleInputChange}
                placeholder="e.g., 9:00 AM"
                required 
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input 
                id="duration" 
                name="duration" 
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 1 hour"
                required 
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <select 
                id="status" 
                name="status" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Visit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVisitDialog;
