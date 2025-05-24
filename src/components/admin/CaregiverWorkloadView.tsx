
import React from 'react';
import WorkloadCard from '@/components/admin/WorkloadCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search } from 'lucide-react';

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

interface CaregiverWorkloadViewProps {
  caregivers: Caregiver[];
}

const CaregiverWorkloadView: React.FC<CaregiverWorkloadViewProps> = ({
  caregivers,
}) => {
  const getStatusFromLoad = (assigned: number, max: number) => {
    if (max === 0) return { label: 'Inactive', color: 'bg-gray-100 text-gray-800' };
    const load = (assigned / max) * 100;
    if (load >= 95) return { label: 'Overloaded', color: 'bg-red-100 text-red-800' };
    if (load >= 75) return { label: 'Near Limit', color: 'bg-yellow-100 text-yellow-800' };
    if (load < 60) return { label: 'Underutilized', color: 'bg-blue-100 text-blue-800' };
    return { label: 'Optimal', color: 'bg-green-100 text-green-800' };
  };

  // Sort caregivers by workload status (overloaded first, then by utilization percentage)
  const sortedCaregivers = [...caregivers].sort((a, b) => {
    const aLoad = a.maxHours ? (a.assignedHours / a.maxHours) * 100 : 0;
    const bLoad = b.maxHours ? (b.assignedHours / b.maxHours) * 100 : 0;
    
    // Overloaded staff first
    if (aLoad >= 95 && bLoad < 95) return -1;
    if (bLoad >= 95 && aLoad < 95) return 1;
    
    // Then sort by load percentage (highest first)
    return bLoad - aLoad;
  });

  if (caregivers.length === 0) {
    return (
      <Alert>
        <Search className="h-4 w-4" />
        <AlertDescription>
          No caregivers found matching the current filters. Try adjusting your search criteria.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Caregiver Workload Overview ({caregivers.length} staff members)
        </h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Overloaded (≥95%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Near Limit (75-94%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Optimal (60-74%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Underutilized (<60%)</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCaregivers.map((caregiver) => {
          const loadStatus = getStatusFromLoad(caregiver.assignedHours, caregiver.maxHours);
          const loadPercentage = caregiver.maxHours ? (caregiver.assignedHours / caregiver.maxHours) * 100 : 0;
          
          return (
            <WorkloadCard
              key={caregiver.id}
              caregiver={caregiver}
              loadStatus={loadStatus}
              loadPercentage={loadPercentage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CaregiverWorkloadView;
