
import { useState, useEffect } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';

export const useSchedulerData = (selectedWeek: Date, region: string, specialization: string) => {
  const [caregivers, setCaregivers] = useState([]);
  const [scheduledVisits, setScheduledVisits] = useState([]);
  const [unassignedVisits, setUnassignedVisits] = useState([]);

  // Generate mock caregivers with different regions
  const generateMockCaregivers = () => {
    const caregivers = [
      {
        id: '1',
        name: 'Sarah Johnson',
        role: 'RN',
        photo: '/placeholder.svg',
        region: 'North',
        assignedHours: 32,
        maxHours: 40,
        specializations: ['RN', 'General Care']
      },
      {
        id: '2',
        name: 'Michael Williams',
        role: 'LPN',
        photo: '/placeholder.svg',
        region: 'South',
        assignedHours: 28,
        maxHours: 40,
        specializations: ['LPN', 'General Care']
      },
      {
        id: '3',
        name: 'Emily Brown',
        role: 'CNA',
        photo: '/placeholder.svg',
        region: 'East',
        assignedHours: 35,
        maxHours: 40,
        specializations: ['CNA', 'General Care']
      },
      {
        id: '4',
        name: 'David Chen',
        role: 'RN',
        photo: '/placeholder.svg',
        region: 'North',
        assignedHours: 38,
        maxHours: 40,
        specializations: ['RN', 'Wound Care']
      },
      {
        id: '5',
        name: 'Maria Rodriguez',
        role: 'LPN',
        photo: '/placeholder.svg',
        region: 'Central',
        assignedHours: 30,
        maxHours: 40,
        specializations: ['LPN', 'Medication Management']
      },
      {
        id: '6',
        name: 'James Thompson',
        role: 'CNA',
        photo: '/placeholder.svg',
        region: 'South',
        assignedHours: 36,
        maxHours: 40,
        specializations: ['CNA', 'Personal Care']
      }
    ];
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
    {
      id: 'v3',
      caregiverId: '3',
      patientName: 'Robert Chen',
      serviceType: 'Wound Care',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '10:00',
      duration: 30,
      status: 'scheduled' as const,
    },
    {
      id: 'v4',
      caregiverId: '1',
      patientName: 'Mary Davis',
      serviceType: 'Personal Care',
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      startTime: '11:00',
      duration: 90,
      status: 'scheduled' as const,
    },
    {
      id: 'v5',
      caregiverId: '4',
      patientName: 'James Wilson',
      serviceType: 'Companionship',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '15:00',
      duration: 120,
      status: 'scheduled' as const,
    },
    {
      id: 'v6',
      caregiverId: '5',
      patientName: 'Alice Cooper',
      serviceType: 'Medication Management',
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      startTime: '10:00',
      duration: 30,
      status: 'scheduled' as const,
    }
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
    {
      id: 'u3',
      patientName: 'Thomas Lee',
      serviceType: 'Physical Therapy',
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      startTime: '13:00',
      duration: 60,
      status: 'unassigned' as const,
      priority: 'low' as const,
    },
  ];

  useEffect(() => {
    // Filter caregivers based on region and specialization
    let filteredCaregivers = mockCaregivers;
    
    if (region !== 'all') {
      filteredCaregivers = filteredCaregivers.filter(c => 
        c.region.toLowerCase() === region.toLowerCase()
      );
    }
    
    if (specialization !== 'all') {
      filteredCaregivers = filteredCaregivers.filter(c => 
        c.role.toLowerCase() === specialization.toLowerCase()
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

  const addUnassignedVisit = (visitData: any) => {
    const newVisit = {
      id: `u${Date.now()}`,
      ...visitData,
      status: 'unassigned' as const,
      priority: 'medium' as const,
    };
    
    setUnassignedVisits(prev => [...prev, newVisit]);
  };

  const refreshData = () => {
    console.log('Refreshing scheduler data...');
    // Re-trigger the useEffect by updating a dependency or force refresh
  };

  return {
    caregivers,
    scheduledVisits,
    unassignedVisits,
    assignVisit,
    moveVisit,
    addUnassignedVisit,
    refreshData,
  };
};
