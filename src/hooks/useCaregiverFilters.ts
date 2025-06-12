
import { useState } from 'react';
import { Caregiver } from '@/types/admin';
import { startOfWeek } from 'date-fns';

export const useCaregiverFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState<string>('all');
  const [role, setRole] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 6)),
  });
  const [heatmapWeekStart, setHeatmapWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [showOverbookedOnly, setShowOverbookedOnly] = useState(false);

  const filterCaregivers = (caregivers: Caregiver[], activeView: string) => {
    return caregivers.filter(caregiver => {
      const matchesSearch = caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caregiver.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caregiver.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caregiver.patientsList.some(patient => 
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.carePlan.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesRegion = region === 'all' || caregiver.region === region;
      const matchesRole = role === 'all' || caregiver.role.includes(role);
      
      // For heatmap view, filter overbooked caregivers if toggle is on
      if (activeView === 'heatmap' && showOverbookedOnly) {
        const weeklyTotal = Object.values(caregiver.weeklyUtilization || {}).reduce(
          (total, day) => total + day.hours, 0
        );
        const weeklyUtilizationPercent = caregiver.maxHours > 0 
          ? (weeklyTotal / caregiver.maxHours) * 100 
          : 0;
        const isOverbooked = weeklyUtilizationPercent >= 91;
        return matchesSearch && matchesRegion && matchesRole && isOverbooked;
      }
      
      return matchesSearch && matchesRegion && matchesRole;
    });
  };

  return {
    // State
    searchTerm,
    region,
    role,
    dateRange,
    heatmapWeekStart,
    showOverbookedOnly,
    
    // Setters
    setSearchTerm,
    setRegion,
    setRole,
    setDateRange,
    setHeatmapWeekStart,
    setShowOverbookedOnly,
    
    // Filter function
    filterCaregivers,
  };
};
