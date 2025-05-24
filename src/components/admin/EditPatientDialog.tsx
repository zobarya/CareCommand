
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Patient {
  id: string;
  name: string;
  age: number;
  carePlan: string;
  status: string;
  caregiver: string;
  nextVisit: string;
}

interface EditPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: Patient | null;
  onUpdate: (updatedPatient: Patient) => void;
}

const EditPatientDialog: React.FC<EditPatientDialogProps> = ({ 
  open, 
  onOpenChange, 
  patient, 
  onUpdate 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    carePlan: 'basic',
    status: 'Active',
    caregiver: '',
    nextVisit: '',
  });

  useEffect(() => {
    if (patient) {
      const [firstName, ...lastNameParts] = patient.name.split(' ');
      setFormData({
        name: patient.name,
        age: patient.age.toString(),
        carePlan: patient.carePlan.toLowerCase(),
        status: patient.status,
        caregiver: patient.caregiver,
        nextVisit: patient.nextVisit,
      });
    }
  }, [patient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const caregivers = [
    'Jane Doe, RN',
    'Mike Johnson, HHA',
    'Sarah Williams, LPN'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patient) {
      const updatedPatient: Patient = {
        ...patient,
        name: formData.name,
        age: parseInt(formData.age),
        carePlan: formData.carePlan.charAt(0).toUpperCase() + formData.carePlan.slice(1),
        status: formData.status,
        caregiver: formData.caregiver,
        nextVisit: formData.nextVisit,
      };
      onUpdate(updatedPatient);
      toast.success('Patient updated successfully');
      onOpenChange(false);
    }
  };

  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Patient</DialogTitle>
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
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                name="age" 
                type="number"
                value={formData.age}
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
              <Label htmlFor="caregiver">Primary Caregiver</Label>
              <select 
                id="caregiver" 
                name="caregiver" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.caregiver}
                onChange={handleInputChange}
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
              <Label htmlFor="nextVisit">Next Visit</Label>
              <Input 
                id="nextVisit" 
                name="nextVisit" 
                value={formData.nextVisit}
                onChange={handleInputChange}
                placeholder="e.g., Today, 9:00 AM"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Patient</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPatientDialog;
