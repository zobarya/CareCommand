import { useState, useEffect } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';

export const useSchedulerData = (selectedWeek: Date, region: string, specialization: string) => {
  const [caregivers, setCaregivers] = useState([]);
  const [scheduledVisits, setScheduledVisits] = useState([]);
  const [unassignedVisits, setUnassignedVisits] = useState([]);

  // Generate 100+ mock caregivers for testing
  const generateMockCaregivers = () => {
    const regions = ['North', 'South', 'East', 'West', 'Central'];
    const roles = ['RN', 'LPN', 'CNA', 'PT', 'OT'];
    const firstNames = ['Sarah', 'Michael', 'Emily', 'Robert', 'Lisa', 'David', 'Jennifer', 'Christopher', 'Amanda', 'Daniel', 'Jessica', 'Matthew', 'Ashley', 'Anthony', 'Brittany', 'Joshua', 'Megan', 'Andrew', 'Samantha', 'Kevin'];
    const lastNames = ['Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee'];
    
    const caregivers = [];
    for (let i = 1; i <= 120; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const role = roles[Math.floor(Math.random() * roles.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];
      
      caregivers.push({
        id: i.toString(),
        name: `${firstName} ${lastName}`,
        role: role,
        photo: '/placeholder.svg',
        region: region,
        assignedHours: Math.floor(Math.random() * 35) + 5,
        maxHours: 40,
        specializations: [role, 'General Care']
      });
    }
    return caregivers;
  };

  const mockCaregivers = generateMockCaregivers();

  const mockScheduledVisits = [
    {
      id: 'v1',
      caregiverId: '1',
      patientName: 'John Smith',
      serviceType: 'Medication Management',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      duration: 60,
      status: 'scheduled' as const,
      notes: 'Regular medication check and blood pressure monitoring'
    },
    {
      id: 'v2',
      caregiverId: '2',
      patientName: 'Emma Wilson',
      serviceType: 'Physical Therapy',
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      startTime: '14:00',
      duration: 45,
      status: 'scheduled' as const,
    },
  ];

  const mockUnassignedVisits = [
    {
      id: 'u1',
      patientName: 'Robert Brown',
      serviceType: 'Wound Care',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '11:00',
      duration: 30,
      status: 'unassigned' as const,
      priority: 'high' as const,
      notes: 'Urgent wound dressing change required'
    },
    {
      id: 'u2',
      patientName: 'Maria Garcia',
      serviceType: 'Personal Care',
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      startTime: '16:00',
      duration: 90,
      status: 'unassigned' as const,
      priority: 'medium' as const,
    },
  ];

  useEffect(() => {
    // Simulate API call with filters
    let filteredCaregivers = mockCaregivers;
    
    if (region !== 'all') {
      filteredCaregivers = filteredCaregivers.filter(c => c.region.toLowerCase() === region);
    }
    
    if (specialization !== 'all') {
      filteredCaregivers = filteredCaregivers.filter(c => 
        c.specializations.some(s => s.toLowerCase() === specialization)
      );
    }
    
    setCaregivers(filteredCaregivers);
    setScheduledVisits(mockScheduledVisits);
    setUnassignedVisits(mockUnassignedVisits);
  }, [selectedWeek, region, specialization]);

  const assignVisit = (visitId: string, caregiverId: string, timeSlot: string) => {
    console.log('Assigning visit:', visitId, 'to caregiver:', caregiverId);
    
    const visit = unassignedVisits.find(v => v.id === visitId);
    if (!visit) {
      console.log('Visit not found in unassigned visits');
      return;
    }

    const newScheduledVisit = {
      ...visit,
      caregiverId,
      startTime: timeSlot,
      status: 'scheduled' as const,
    };

    setScheduledVisits(prev => {
      console.log('Adding to scheduled visits:', newScheduledVisit);
      return [...prev, newScheduledVisit];
    });
    
    setUnassignedVisits(prev => {
      const updated = prev.filter(v => v.id !== visitId);
      console.log('Remaining unassigned visits:', updated);
      return updated;
    });
  };

  const moveVisit = (visitId: string, newCaregiverId: string, newTimeSlot: string) => {
    console.log('Moving visit:', visitId, 'to caregiver:', newCaregiverId);
    
    // Check if it's an unassigned visit being assigned
    const unassignedVisit = unassignedVisits.find(v => v.id === visitId);
    if (unassignedVisit) {
      assignVisit(visitId, newCaregiverId, newTimeSlot);
      return;
    }
    
    // Otherwise, move between caregivers
    setScheduledVisits(prev => 
      prev.map(visit => 
        visit.id === visitId 
          ? { ...visit, caregiverId: newCaregiverId, startTime: newTimeSlot }
          : visit
      )
    );
  };

  const refreshData = () => {
    // Simulate refresh
    console.log('Refreshing scheduler data...');
  };

  return {
    caregivers,
    scheduledVisits,
    unassignedVisits,
    assignVisit,
    moveVisit,
    refreshData,
  };
};
