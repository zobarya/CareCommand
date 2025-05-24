
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info, TrendingDown } from 'lucide-react';

interface WorkloadInsightsProps {
  caregivers: Array<{
    id: string;
    name: string;
    assignedHours: number;
    maxHours: number;
    status: string;
  }>;
}

const WorkloadInsights: React.FC<WorkloadInsightsProps> = ({ caregivers }) => {
  const activeCaregivers = caregivers.filter(c => c.status === 'Active');
  
  const overloadedStaff = activeCaregivers.filter(c => 
    c.maxHours > 0 && (c.assignedHours / c.maxHours) >= 0.95
  );
  
  const underutilizedStaff = activeCaregivers.filter(c => 
    c.maxHours > 0 && (c.assignedHours / c.maxHours) < 0.6
  );

  const insights = [];

  if (overloadedStaff.length > 0) {
    insights.push({
      type: 'warning' as const,
      icon: <AlertTriangle className="h-4 w-4" />,
      title: 'Staff Overload Alert',
      message: `${overloadedStaff.length} caregiver${overloadedStaff.length > 1 ? 's are' : ' is'} working at or above 95% capacity. Consider redistributing workload or hiring additional staff.`,
      names: overloadedStaff.map(s => s.name).join(', ')
    });
  }

  if (underutilizedStaff.length > 0) {
    insights.push({
      type: 'info' as const,
      icon: <TrendingDown className="h-4 w-4" />,
      title: 'Optimization Opportunity',
      message: `${underutilizedStaff.length} caregiver${underutilizedStaff.length > 1 ? 's have' : ' has'} capacity for additional assignments (under 60% utilization).`,
      names: underutilizedStaff.map(s => s.name).join(', ')
    });
  }

  if (insights.length === 0) {
    insights.push({
      type: 'info' as const,
      icon: <Info className="h-4 w-4" />,
      title: 'Workload Balanced',
      message: 'All active caregivers are within optimal workload ranges (60-95% utilization).',
      names: ''
    });
  }

  return (
    <div className="space-y-3 mb-6">
      {insights.map((insight, index) => (
        <Alert key={index} variant={insight.type === 'warning' ? 'destructive' : 'default'}>
          {insight.icon}
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-medium">{insight.title}</p>
              <p className="text-sm">{insight.message}</p>
              {insight.names && (
                <p className="text-xs text-muted-foreground">
                  Affected staff: {insight.names}
                </p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default WorkloadInsights;
