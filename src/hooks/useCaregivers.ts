
import { useState } from 'react';

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

export const useCaregivers = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([
    {
      id: '1',
      name: 'Jane Doe',
      role: 'Registered Nurse',
      specialty: 'Geriatric Care',
      status: 'Active',
      patients: 6,
      availability: 'Full-time',
      region: 'North',
      assignedHours: 38,
      maxHours: 40,
      visits: 12,
      photo: 'JD'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Home Health Aide',
      specialty: 'Physical Assistance',
      status: 'Active',
      patients: 8,
      availability: 'Part-time',
      region: 'South',
      assignedHours: 22,
      maxHours: 25,
      visits: 10,
      photo: 'MJ'
    },
    {
      id: '3',
      name: 'Sarah Williams',
      role: 'Licensed Practical Nurse',
      specialty: 'Wound Care',
      status: 'Active',
      patients: 5,
      availability: 'Full-time',
      region: 'East',
      assignedHours: 35,
      maxHours: 40,
      visits: 8,
      photo: 'SW'
    },
    {
      id: '4',
      name: 'Robert Chen',
      role: 'Physical Therapist',
      specialty: 'Rehabilitation',
      status: 'Inactive',
      patients: 0,
      availability: 'On Leave',
      region: 'West',
      assignedHours: 0,
      maxHours: 0,
      visits: 0,
      photo: 'RC'
    },
    {
      id: '5',
      name: 'Lisa Martinez',
      role: 'Registered Nurse',
      specialty: 'Pediatric Care',
      status: 'Active',
      patients: 4,
      availability: 'Full-time',
      region: 'Central',
      assignedHours: 42,
      maxHours: 40,
      visits: 14,
      photo: 'LM'
    },
  ]);

  const handleUpdateCaregiver = (updatedCaregiver: Caregiver) => {
    setCaregivers(prev => prev.map(c => c.id === updatedCaregiver.id ? updatedCaregiver : c));
  };

  const handleAddCaregiver = (newCaregiverData: any) => {
    const newCaregiver: Caregiver = {
      id: (caregivers.length + 1).toString(),
      name: `${newCaregiverData.firstName} ${newCaregiverData.lastName}`,
      role: newCaregiverData.role,
      specialty: newCaregiverData.specialty || 'General Care',
      status: 'Active',
      patients: 0,
      availability: newCaregiverData.availability.charAt(0).toUpperCase() + newCaregiverData.availability.slice(1),
      region: 'Central',
      assignedHours: 0,
      maxHours: newCaregiverData.availability === 'full-time' ? 40 : 25,
      visits: 0,
      photo: `${newCaregiverData.firstName.charAt(0)}${newCaregiverData.lastName.charAt(0)}`
    };
    setCaregivers(prev => [...prev, newCaregiver]);
  };

  const regions = Array.from(new Set(caregivers.map(c => c.region)));
  const roles = Array.from(new Set(caregivers.map(c => c.role)));

  return {
    caregivers,
    handleUpdateCaregiver,
    handleAddCaregiver,
    regions,
    roles,
  };
};
