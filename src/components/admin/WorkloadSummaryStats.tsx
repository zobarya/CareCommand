
import React from 'react';
import { Users, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import CardStat from '@/components/ui/card-stat';

interface WorkloadSummaryStatsProps {
  caregivers: Array<{
    id: string;
    name: string;
    assignedHours: number;
    maxHours: number;
    status: string;
  }>;
}

const WorkloadSummaryStats: React.FC<WorkloadSummaryStatsProps> = ({ caregivers }) => {
  const activeCaregivers = caregivers.filter(c => c.status === 'Active');
  const totalCaregivers = activeCaregivers.length;
  
  const overloadedCaregivers = activeCaregivers.filter(c => 
    c.maxHours > 0 && (c.assignedHours / c.maxHours) >= 0.95
  ).length;
  
  const totalAssignedHours = activeCaregivers.reduce((sum, c) => sum + c.assignedHours, 0);
  const totalMaxHours = activeCaregivers.reduce((sum, c) => sum + c.maxHours, 0);
  const averageUtilization = totalMaxHours > 0 ? (totalAssignedHours / totalMaxHours) * 100 : 0;
  
  const underutilizedCaregivers = activeCaregivers.filter(c => 
    c.maxHours > 0 && (c.assignedHours / c.maxHours) < 0.6
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <CardStat
        title="Total Active Caregivers"
        value={totalCaregivers}
        icon={<Users className="h-5 w-5" />}
      />
      
      <CardStat
        title="Average Utilization"
        value={`${Math.round(averageUtilization)}%`}
        icon={<TrendingUp className="h-5 w-5" />}
        trend={{
          value: 5,
          isPositive: true
        }}
      />
      
      <CardStat
        title="Overloaded Staff"
        value={overloadedCaregivers}
        icon={<AlertTriangle className="h-5 w-5" />}
        className={overloadedCaregivers > 0 ? "border-red-200 bg-red-50" : ""}
      />
      
      <CardStat
        title="Underutilized Staff"
        value={underutilizedCaregivers}
        icon={<Clock className="h-5 w-5" />}
        className={underutilizedCaregivers > 0 ? "border-yellow-200 bg-yellow-50" : ""}
      />
    </div>
  );
};

export default WorkloadSummaryStats;
