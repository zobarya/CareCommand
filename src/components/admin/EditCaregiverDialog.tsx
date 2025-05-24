
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

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

interface EditCaregiverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caregiver: Caregiver | null;
  onUpdate: (updatedCaregiver: Caregiver) => void;
}

const EditCaregiverDialog: React.FC<EditCaregiverDialogProps> = ({ 
  open, 
  onOpenChange, 
  caregiver, 
  onUpdate 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    specialty: '',
    status: 'Active',
    availability: 'full-time',
    region: '',
    maxHours: '',
  });

  useEffect(() => {
    if (caregiver) {
      setFormData({
        name: caregiver.name,
        role: caregiver.role,
        specialty: caregiver.specialty,
        status: caregiver.status,
        availability: caregiver.availability.toLowerCase().replace('-', '-'),
        region: caregiver.region,
        maxHours: caregiver.maxHours.toString(),
      });
    }
  }, [caregiver]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (caregiver) {
      const updatedCaregiver: Caregiver = {
        ...caregiver,
        name: formData.name,
        role: formData.role,
        specialty: formData.specialty,
        status: formData.status,
        availability: formData.availability.charAt(0).toUpperCase() + formData.availability.slice(1),
        region: formData.region,
        maxHours: parseInt(formData.maxHours),
      };
      onUpdate(updatedCaregiver);
      toast.success('Caregiver updated successfully');
      onOpenChange(false);
    }
  };

  if (!caregiver) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Caregiver</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <select 
                id="role" 
                name="role" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a role</option>
                <option value="Registered Nurse">Registered Nurse</option>
                <option value="Licensed Practical Nurse">Licensed Practical Nurse</option>
                <option value="Home Health Aide">Home Health Aide</option>
                <option value="Physical Therapist">Physical Therapist</option>
                <option value="Occupational Therapist">Occupational Therapist</option>
              </select>
            </div>

            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Input 
                id="specialty" 
                name="specialty" 
                value={formData.specialty}
                onChange={handleInputChange}
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <Label htmlFor="availability">Availability</Label>
              <select 
                id="availability" 
                name="availability" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.availability}
                onChange={handleInputChange}
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div>
              <Label htmlFor="region">Region</Label>
              <select 
                id="region" 
                name="region" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.region}
                onChange={handleInputChange}
              >
                <option value="">Select a region</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="Central">Central</option>
              </select>
            </div>

            <div>
              <Label htmlFor="maxHours">Max Hours per Week</Label>
              <Input 
                id="maxHours" 
                name="maxHours" 
                type="number"
                value={formData.maxHours}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Caregiver</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCaregiverDialog;
