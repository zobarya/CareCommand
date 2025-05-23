
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddPatientDialog: React.FC<AddPatientDialogProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    carePlan: 'basic',
    primaryCaregiver: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const caregivers = [
    { id: '1', name: 'Jane Doe, RN' },
    { id: '2', name: 'Mike Johnson, HHA' },
    { id: '3', name: 'Sarah Williams, LPN' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Patient added successfully');
    onOpenChange(false);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      address: '',
      carePlan: 'basic',
      primaryCaregiver: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
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
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input 
                id="dateOfBirth" 
                name="dateOfBirth" 
                type="date" 
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
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
              <Label htmlFor="address">Address</Label>
              <textarea 
                id="address" 
                name="address" 
                className="w-full p-2 border border-gray-300 rounded-lg" 
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="carePlan">Care Plan</Label>
              <select 
                id="carePlan" 
                name="carePlan" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.carePlan}
                onChange={handleInputChange}
              >
                <option value="basic">Basic</option>
                <option value="comprehensive">Comprehensive</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <Label htmlFor="primaryCaregiver">Primary Caregiver</Label>
              <select 
                id="primaryCaregiver" 
                name="primaryCaregiver" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.primaryCaregiver}
                onChange={handleInputChange}
              >
                <option value="">Select a caregiver</option>
                {caregivers.map(caregiver => (
                  <option key={caregiver.id} value={caregiver.id}>
                    {caregiver.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Patient</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
