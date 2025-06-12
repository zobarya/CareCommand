import { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';

interface Patient {
  id: string;
  name: string;
  age: number;
  carePlan: string;
  status: string;
  nextVisit: string;
  contactInfo: string;
}

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
  patientsList: Patient[];
  weeklyUtilization: {
    [date: string]: {
      hours: number;
      visits: number;
      patients: number;
    };
  };
}

const generateMockPatients = (caregiverId: string, count: number): Patient[] => {
  const patientNames = [
    'Margaret Thompson', 'Robert Johnson', 'Dorothy Miller', 'William Davis',
    'Helen Wilson', 'Charles Brown', 'Ruth Garcia', 'Frank Rodriguez',
    'Anna Martinez', 'George Anderson', 'Marie Taylor', 'Paul Thomas'
  ];
  
  const carePlans = [
    'Post-surgical recovery', 'Medication management', 'Physical therapy',
    'Wound care', 'Diabetes management', 'Mobility assistance',
    'Chronic pain management', 'Dementia care', 'Fall prevention'
  ];

  const patients: Patient[] = [];
  
  for (let i = 0; i < count; i++) {
    const patientId = `${caregiverId}-patient-${i + 1}`;
    const name = patientNames[Math.floor(Math.random() * patientNames.length)];
    const age = Math.floor(Math.random() * 30) + 65; // Ages 65-95
    const carePlan = carePlans[Math.floor(Math.random() * carePlans.length)];
    const status = Math.random() > 0.1 ? 'Active' : 'Inactive';
    
    const nextVisitDays = Math.floor(Math.random() * 7) + 1;
    const nextVisit = format(addDays(new Date(), nextVisitDays), 'MMM d, yyyy');
    
    patients.push({
      id: patientId,
      name,
      age,
      carePlan,
      status,
      nextVisit,
      contactInfo: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
    });
  }
  
  return patients;
};

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
      patientsList: generateMockPatients('1', 6),
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
      patientsList: generateMockPatients('2', 8),
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
      patientsList: generateMockPatients('3', 5),
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
      patientsList: [],
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
      patientsList: generateMockPatients('5', 4),
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
      patientsList: [],
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
