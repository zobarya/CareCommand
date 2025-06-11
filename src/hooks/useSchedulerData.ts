import { useState, useEffect } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';

export const useSchedulerData = (selectedWeek: Date, region: string, specialization: string) => {
  const [caregivers, setCaregivers] = useState([]);
  const [scheduledVisits, setScheduledVisits] = useState([]);
  const [unassignedVisits, setUnassignedVisits] = useState([]);

  // Generate only 3 mock caregivers for focused display
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
      caregiverId: '2',
      patientName: 'James Wilson',
      serviceType: 'Companionship',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '15:00',
      duration: 120,
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
  ];

  useEffect(() => {
    // Always show all 3 caregivers regardless of filters for this focused design
    setCaregivers(mockCaregivers);
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
