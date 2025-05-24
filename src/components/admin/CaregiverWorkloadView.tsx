
import React from 'react';
import WorkloadCard from '@/components/admin/WorkloadCard';

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
    return { label: 'Normal', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {caregivers.map((caregiver) => {
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
  );
};

export default CaregiverWorkloadView;
