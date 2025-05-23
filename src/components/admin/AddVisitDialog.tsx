
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AddVisitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddVisitDialog: React.FC<AddVisitDialogProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    patient: '',
    caregiver: '',
    date: '',
    startTime: '',
    endTime: '',
    visitType: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Mock data
  const patients = [
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Emma Wilson' },
    { id: '3', name: 'Robert Brown' },
    { id: '4', name: 'Sarah Johnson' }
  ];

  const caregivers = [
    { id: '1', name: 'Jane Doe, RN' },
    { id: '2', name: 'Mike Johnson, HHA' },
    { id: '3', name: 'Sarah Williams, LPN' }
  ];

  const visitTypes = [
    { id: 'nursing', name: 'Nursing Visit' },
    { id: 'therapy', name: 'Therapy Visit' },
    { id: 'aide', name: 'Home Health Aide' },
    { id: 'social', name: 'Social Worker' },
    { id: 'assessment', name: 'Initial Assessment' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Visit scheduled successfully');
    onOpenChange(false);
    // Reset form
    setFormData({
      patient: '',
      caregiver: '',
      date: '',
      startTime: '',
      endTime: '',
      visitType: '',
      notes: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule New Visit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="patient">Patient</Label>
              <select 
                id="patient" 
                name="patient" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.patient}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="caregiver">Caregiver</Label>
              <select 
                id="caregiver" 
                name="caregiver" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.caregiver}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a caregiver</option>
                {caregivers.map(caregiver => (
                  <option key={caregiver.id} value={caregiver.id}>
                    {caregiver.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="visitType">Visit Type</Label>
              <select 
                id="visitType" 
                name="visitType" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.visitType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select visit type</option>
                {visitTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input 
                  id="startTime" 
                  name="startTime" 
                  type="time" 
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input 
                  id="endTime" 
                  name="endTime" 
                  type="time" 
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea 
                id="notes" 
                name="notes" 
                className="w-full p-2 border border-gray-300 rounded-lg" 
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any specific instructions or notes for this visit"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Visit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVisitDialog;
