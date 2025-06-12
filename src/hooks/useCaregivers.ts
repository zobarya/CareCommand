import { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';

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
  weeklyUtilization: {
    [date: string]: {
      hours: number;
      visits: number;
      patients: number;
    };
  };
}

const generateMockWeeklyData = (weekStartDate?: Date) => {
  const weekStart = weekStartDate ? startOfWeek(weekStartDate, { weekStartsOn: 1 }) : startOfWeek(new Date(), { weekStartsOn: 1 });
  const weeklyData: { [date: string]: { hours: number; visits: number; patients: number } } = {};
  
  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i);
    const dateKey = format(date, 'yyyy-MM-dd');
    
    // Generate realistic data (weekdays more busy than weekends)
    const isWeekend = i >= 5;
    const baseHours = isWeekend ? Math.random() * 4 : Math.random() * 8;
    const hours = Math.round(baseHours * 10) / 10;
    const visits = Math.floor(hours / 2) + Math.floor(Math.random() * 2);
    const patients = Math.max(1, Math.floor(visits * 0.7));
    
    weeklyData[dateKey] = { hours, visits, patients };
  }
  
  return weeklyData;
};

// Generate data for multiple weeks to ensure we have data for any week the user selects
const generateMultiWeekData = () => {
  const allData: { [date: string]: { hours: number; visits: number; patients: number } } = {};
  
  // Generate data for 8 weeks (4 before current, current, 3 after)
  for (let weekOffset = -4; weekOffset <= 3; weekOffset++) {
    const weekStart = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), weekOffset * 7);
    const weekData = generateMockWeeklyData(weekStart);
    Object.assign(allData, weekData);
  }
  
  return allData;
};

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
      photo: 'JD',
      weeklyUtilization: generateMultiWeekData()
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
      photo: 'MJ',
      weeklyUtilization: generateMultiWeekData()
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
      photo: 'SW',
      weeklyUtilization: generateMultiWeekData()
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
      photo: 'RC',
      weeklyUtilization: {}
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
      photo: 'LM',
      weeklyUtilization: generateMultiWeekData()
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
      photo: `${newCaregiverData.firstName.charAt(0)}${newCaregiverData.lastName.charAt(0)}`,
      weeklyUtilization: generateMultiWeekData()
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
