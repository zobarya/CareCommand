
import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockCaregivers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Registered Nurse',
    region: 'North',
    assignedHours: 32,
    maxHours: 40,
    specializations: ['Geriatric Care', 'Wound Care']
  },
  {
    id: '2',
    name: 'Michael Williams',
    role: 'Home Health Aide',
    region: 'Central',
    assignedHours: 28,
    maxHours: 35,
    specializations: ['Physical Assistance', 'Companionship']
  },
  {
    id: '3',
    name: 'Emily Brown',
    role: 'Licensed Practical Nurse',
    region: 'South',
    assignedHours: 36,
    maxHours: 40,
    specializations: ['Medication Management', 'Vital Signs']
  },
  {
    id: '4',
    name: 'David Chen',
    role: 'Physical Therapist',
    region: 'East',
    assignedHours: 30,
    maxHours: 40,
    specializations: ['Rehabilitation', 'Mobility Training']
  },
  {
    id: '5',
    name: 'Maria Rodriguez',
    role: 'Registered Nurse',
    region: 'West',
    assignedHours: 38,
    maxHours: 40,
    specializations: ['Pediatric Care', 'Family Support']
  },
  {
    id: '6',
    name: 'James Thompson',
    role: 'Home Health Aide',
    region: 'North',
    assignedHours: 25,
    maxHours: 30,
    specializations: ['Personal Care', 'Meal Preparation']
  }
];

const mockScheduledVisits = [
  {
    id: '1',
    caregiverId: '1',
    patientName: 'John Doe',
    serviceType: 'Wound Care',
    date: '2024-01-15',
    startTime: '09:00',
    duration: 60,
    status: 'scheduled' as const
  },
  {
    id: '2',
    caregiverId: '2',
    patientName: 'Jane Smith',
    serviceType: 'Physical Assistance',
    date: '2024-01-15',
    startTime: '10:00',
    duration: 90,
    status: 'scheduled' as const
  }
];

const mockUnassignedVisits = [
  {
    id: '3',
    patientName: 'Robert Johnson',
    serviceType: 'Medication Check',
    date: '2024-01-16',
    startTime: '14:00',
    duration: 30,
    status: 'unassigned' as const,
    priority: 'high' as const
  },
  {
    id: '4',
    patientName: 'Mary Williams',
    serviceType: 'Companionship',
    date: '2024-01-17',
    startTime: '11:00',
    duration: 120,
    status: 'unassigned' as const,
    priority: 'medium' as const
  }
];

export const useSchedulerData = (selectedWeek: Date, selectedRegion: string, selectedSpecialization: string) => {
  const [caregivers, setCaregivers] = useState(mockCaregivers);
  const [scheduledVisits, setScheduledVisits] = useState(mockScheduledVisits);
  const [unassignedVisits, setUnassignedVisits] = useState(mockUnassignedVisits);

  const assignVisit = (visitId: string, caregiverId: string, timeSlot: string) => {
    const visit = unassignedVisits.find(v => v.id === visitId);
    if (!visit) return;

    // Remove from unassigned
    setUnassignedVisits(prev => prev.filter(v => v.id !== visitId));
    
    // Add to scheduled
    const scheduledVisit = {
      ...visit,
      caregiverId,
      startTime: timeSlot,
      status: 'scheduled' as const
    };
    setScheduledVisits(prev => [...prev, scheduledVisit]);
  };

  const moveVisit = (visitId: string, newCaregiverId: string, newTimeSlot: string) => {
    setScheduledVisits(prev => prev.map(visit => 
      visit.id === visitId 
        ? { ...visit, caregiverId: newCaregiverId, startTime: newTimeSlot }
        : visit
    ));
  };

  const addUnassignedVisit = (visitData: any) => {
    const newVisit = {
      id: Date.now().toString(),
      ...visitData,
      status: 'unassigned' as const,
      priority: visitData.priority || 'medium' as const
    };
    setUnassignedVisits(prev => [...prev, newVisit]);
  };

  const addScheduledVisit = (visitData: any) => {
    const newVisit = {
      id: Date.now().toString(),
      ...visitData,
      status: 'scheduled' as const
    };
    setScheduledVisits(prev => [...prev, newVisit]);
  };

  const refreshData = () => {
    // In a real app, this would refetch from the server
    console.log('Refreshing scheduler data...');
  };

  return {
    caregivers,
    scheduledVisits,
    unassignedVisits,
    assignVisit,
    moveVisit,
    addUnassignedVisit,
    addScheduledVisit,
    refreshData
  };
};
