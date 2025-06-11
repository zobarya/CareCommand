import { useState, useEffect } from 'react';

// Get current week dates for better demo experience
const getCurrentWeekDate = (dayOffset: number) => {
  const today = new Date();
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset + dayOffset);
  return monday.toISOString().split('T')[0];
};

// Mock data for demonstration with current week dates
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
    date: getCurrentWeekDate(0), // Monday
    startTime: '09:00',
    duration: 60,
    status: 'scheduled' as const
  },
  {
    id: '2',
    caregiverId: '2',
    patientName: 'Jane Smith',
    serviceType: 'Physical Assistance',
    date: getCurrentWeekDate(1), // Tuesday
    startTime: '10:00',
    duration: 90,
    status: 'scheduled' as const
  },
  {
    id: '3',
    caregiverId: '1',
    patientName: 'Robert Brown',
    serviceType: 'Medication Check',
    date: getCurrentWeekDate(2), // Wednesday
    startTime: '14:00',
    duration: 30,
    status: 'scheduled' as const
  }
];

const mockUnassignedVisits = [
  {
    id: '4',
    patientName: 'Robert Johnson',
    serviceType: 'Medication Check',
    date: getCurrentWeekDate(3), // Thursday
    startTime: '14:00',
    duration: 30,
    status: 'unassigned' as const,
    priority: 'high' as const
  },
  {
    id: '5',
    patientName: 'Mary Williams',
    serviceType: 'Companionship',
    date: getCurrentWeekDate(4), // Friday
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

  const assignVisit = (visitId: string, caregiverId: string, timeSlot: string, targetDate?: string) => {
    console.log('Assigning visit:', { visitId, caregiverId, timeSlot, targetDate });
    
    const visit = unassignedVisits.find(v => v.id === visitId);
    if (!visit) {
      console.error('Visit not found in unassigned:', visitId);
      return;
    }

    // Remove from unassigned
    setUnassignedVisits(prev => {
      const updated = prev.filter(v => v.id !== visitId);
      console.log('Updated unassigned visits:', updated);
      return updated;
    });
    
    // Add to scheduled with updated date if provided
    const scheduledVisit = {
      ...visit,
      caregiverId,
      startTime: timeSlot,
      date: targetDate || visit.date,
      status: 'scheduled' as const
    };
    
    setScheduledVisits(prev => {
      const updated = [...prev, scheduledVisit];
      console.log('Updated scheduled visits:', updated);
      return updated;
    });
  };

  const moveVisit = (visitId: string, newCaregiverId: string, newTimeSlot: string, newDate?: string) => {
    console.log('Moving visit:', { visitId, newCaregiverId, newTimeSlot, newDate });
    
    setScheduledVisits(prev => {
      const updated = prev.map(visit => 
        visit.id === visitId 
          ? { 
              ...visit, 
              caregiverId: newCaregiverId, 
              startTime: newTimeSlot,
              date: newDate || visit.date
            }
          : visit
      );
      console.log('Moved visit, updated scheduled visits:', updated);
      return updated;
    });
  };

  const handleVisitDrop = (visitId: string, caregiverId: string, targetDate: string, timeSlot: string) => {
    console.log('Handling visit drop:', { visitId, caregiverId, targetDate, timeSlot });
    
    // Check if it's an unassigned visit
    const unassignedVisit = unassignedVisits.find(v => v.id === visitId);
    if (unassignedVisit) {
      console.log('Assigning unassigned visit');
      assignVisit(visitId, caregiverId, timeSlot, targetDate);
      return;
    }
    
    // Check if it's a scheduled visit
    const scheduledVisit = scheduledVisits.find(v => v.id === visitId);
    if (scheduledVisit) {
      console.log('Moving scheduled visit');
      moveVisit(visitId, caregiverId, timeSlot, targetDate);
      return;
    }
    
    console.error('Visit not found in either unassigned or scheduled:', visitId);
  };

  const addUnassignedVisit = (visitData: any) => {
    console.log('Adding unassigned visit:', visitData);
    
    const newVisit = {
      id: Date.now().toString(),
      ...visitData,
      status: 'unassigned' as const,
      priority: visitData.priority || 'medium' as const
    };
    
    setUnassignedVisits(prev => {
      const updated = [...prev, newVisit];
      console.log('Updated unassigned visits:', updated);
      return updated;
    });
  };

  const addScheduledVisit = (visitData: any) => {
    console.log('Adding scheduled visit:', visitData);
    
    const newVisit = {
      id: Date.now().toString(),
      ...visitData,
      status: 'scheduled' as const
    };
    
    setScheduledVisits(prev => {
      const updated = [...prev, newVisit];
      console.log('Updated scheduled visits:', updated);
      return updated;
    });
  };

  const refreshData = () => {
    console.log('Refreshing scheduler data...');
    // Force re-render by updating state
    setScheduledVisits(prev => [...prev]);
    setUnassignedVisits(prev => [...prev]);
  };

  return {
    caregivers,
    scheduledVisits,
    unassignedVisits,
    assignVisit,
    moveVisit,
    handleVisitDrop,
    addUnassignedVisit,
    addScheduledVisit,
    refreshData
  };
};
