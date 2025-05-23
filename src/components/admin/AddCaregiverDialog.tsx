
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AddCaregiverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddCaregiverDialog: React.FC<AddCaregiverDialogProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    specialty: '',
    availability: 'full-time',
    startDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Caregiver added successfully');
    onOpenChange(false);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      specialty: '',
      availability: 'full-time',
      startDate: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Caregiver</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                value={formData.phone}
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
                placeholder="e.g., Geriatric Care, Wound Care" 
                value={formData.specialty}
                onChange={handleInputChange}
              />
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
              <Label htmlFor="startDate">Start Date</Label>
              <Input 
                id="startDate" 
                name="startDate" 
                type="date" 
                value={formData.startDate}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Caregiver</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCaregiverDialog;
