
import { useState, useEffect } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';

export const useSchedulerData = (selectedWeek: Date, region: string, specialization: string) => {
  const [caregivers, setCaregivers] = useState([]);
  const [scheduledVisits, setScheduledVisits] = useState([]);
  const [unassignedVisits, setUnassignedVisits] = useState([]);

  // Mock data - in real app this would come from API
  const mockCaregivers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'RN',
      photo: '/placeholder.svg',
      region: 'North',
      assignedHours: 28,
      maxHours: 40,
      specializations: ['RN', 'Wound Care']
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'LPN',
      photo: '/placeholder.svg',
      region: 'North',
      assignedHours: 35,
      maxHours: 40,
      specializations: ['LPN', 'Physical Therapy']
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'CNA',
      photo: '/placeholder.svg',
      region: 'Central',
      assignedHours: 20,
      maxHours: 40,
      specializations: ['CNA', 'Personal Care']
    },
  ];

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
    const visit = unassignedVisits.find(v => v.id === visitId);
    if (!visit) return;

    const newScheduledVisit = {
      ...visit,
      caregiverId,
      startTime: timeSlot,
      status: 'scheduled' as const,
    };

    setScheduledVisits(prev => [...prev, newScheduledVisit]);
    setUnassignedVisits(prev => prev.filter(v => v.id !== visitId));
  };

  const moveVisit = (visitId: string, newCaregiverId: string, newTimeSlot: string) => {
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
