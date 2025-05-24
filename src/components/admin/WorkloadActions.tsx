
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WorkloadActionsProps {
  onRefresh: () => void;
  hasOverloadedStaff: boolean;
  hasUnderutilizedStaff: boolean;
}

const WorkloadActions: React.FC<WorkloadActionsProps> = ({ 
  onRefresh, 
  hasOverloadedStaff, 
  hasUnderutilizedStaff 
}) => {
  const navigate = useNavigate();

  const handleViewSchedule = () => {
    navigate('/admin/calendar');
  };

  const handleManageStaff = () => {
    navigate('/admin/caregivers');
  };

  const handleExportReport = () => {
    // Export functionality would be implemented here
    console.log('Exporting workload report...');
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <div className="flex gap-2">
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
        
        <Button variant="outline" onClick={handleExportReport}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button variant="default" onClick={handleViewSchedule}>
          <Calendar className="h-4 w-4 mr-2" />
          View Schedule
        </Button>
        
        {(hasOverloadedStaff || hasUnderutilizedStaff) && (
          <Button variant="secondary" onClick={handleManageStaff}>
            <Users className="h-4 w-4 mr-2" />
            Manage Staff
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorkloadActions;
