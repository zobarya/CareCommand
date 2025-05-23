
import React from 'react';
import { Calendar, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Caregiver {
  id: string;
  name: string;
  role: string;
  photo: string;
  assignedHours: number;
  maxHours: number;
  visits: number;
  status: string;
}

interface LoadStatus {
  label: string;
  color: string;
}

interface WorkloadCardProps {
  caregiver: Caregiver;
  loadStatus: LoadStatus;
  loadPercentage: number;
}

const WorkloadCard: React.FC<WorkloadCardProps> = ({ caregiver, loadStatus, loadPercentage }) => {
  const navigate = useNavigate();
  
  // Determine progress color
  const getProgressColor = (percentage: number) => {
    if (percentage >= 95) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Check if overloaded
  const isOverloaded = caregiver.assignedHours > caregiver.maxHours;
  
  // Handle view schedule click
  const handleViewSchedule = () => {
    navigate(`/admin/calendar?caregiverId=${caregiver.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all hover:shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
          {caregiver.photo ? (
            <span className="font-medium">{caregiver.photo}</span>
          ) : (
            <User className="h-5 w-5" />
          )}
        </div>
        <div>
          <h3 className="font-medium">{caregiver.name}</h3>
          <p className="text-sm text-gray-500">{caregiver.role}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Weekly Workload</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm font-bold cursor-help">
                  {caregiver.assignedHours}/{caregiver.maxHours} hrs
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isOverloaded 
                    ? `Warning: ${caregiver.name} is scheduled for ${caregiver.assignedHours - caregiver.maxHours} hours beyond their limit` 
                    : `${caregiver.name} has ${caregiver.maxHours - caregiver.assignedHours} hours available this week`}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Progress 
          value={loadPercentage > 100 ? 100 : loadPercentage} 
          className="h-2"
          indicatorClassName={getProgressColor(loadPercentage)}
        />
      </div>
      
      <div className="flex justify-between mb-4">
        <div>
          <span className="text-sm text-gray-500">Total Visits</span>
          <p className="font-medium">{caregiver.visits}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Status</span>
          <p>
            <span className={`inline-block px-2 py-1 rounded-full text-xs ${loadStatus.color}`}>
              {loadStatus.label}
            </span>
          </p>
        </div>
      </div>
      
      <Button variant="outline" className="w-full" size="sm" onClick={handleViewSchedule}>
        <Calendar className="h-4 w-4 mr-2" />
        View Schedule
      </Button>
    </div>
  );
};

export default WorkloadCard;
