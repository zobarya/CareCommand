
import React from 'react';
import { Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import StatusBadge from './status-badge';

interface VisitCardProps {
  visit: {
    id: string;
    date: string;
    time: string;
    duration: string;
    status: 'completed' | 'scheduled' | 'in-progress' | 'cancelled' | 'pending';
    caregiverName?: string;
    patientName?: string;
    tasks?: string[];
  };
  role: 'admin' | 'caregiver' | 'patient' | 'family';
  onClick?: () => void;
  className?: string;
}

const VisitCard: React.FC<VisitCardProps> = ({ 
  visit, 
  role,
  onClick,
  className 
}) => {
  const isCaregiver = role === 'caregiver';
  const isAdmin = role === 'admin';
  
  return (
    <div 
      className={cn(
        'bg-white rounded-lg p-4 shadow-sm border border-gray-100',
        'hover:shadow-md transition-shadow cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-medium">{visit.date}</p>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Clock className="h-4 w-4 mr-1" />
            <span>{visit.time} • {visit.duration}</span>
          </div>
        </div>
        <StatusBadge status={visit.status} />
      </div>
      
      {/* Show patient info for admin/caregiver, caregiver info for patient/family */}
      <div className="flex items-center text-sm mt-3">
        <User className="h-4 w-4 mr-1 text-gray-500" />
        <span className="text-gray-700">
          {isCaregiver || isAdmin ? visit.patientName : visit.caregiverName}
        </span>
      </div>
      
      {visit.tasks && visit.tasks.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-medium text-gray-500 mb-1">Tasks</p>
          <div className="flex flex-wrap gap-1">
            {visit.tasks.slice(0, 3).map((task, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 rounded-full px-2 py-0.5"
              >
                {task}
              </span>
            ))}
            {visit.tasks.length > 3 && (
              <span className="text-xs bg-gray-100 rounded-full px-2 py-0.5">
                +{visit.tasks.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitCard;
