
import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'completed' | 'scheduled' | 'in-progress' | 'cancelled' | 'pending';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusStyles = {
    'completed': 'bg-green-100 text-green-800',
    'scheduled': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'cancelled': 'bg-red-100 text-red-800',
    'pending': 'bg-gray-100 text-gray-800',
  };

  const statusLabel = {
    'completed': 'Completed',
    'scheduled': 'Scheduled',
    'in-progress': 'In Progress',
    'cancelled': 'Cancelled',
    'pending': 'Pending',
  };

  return (
    <span className={cn(
      'px-2.5 py-0.5 rounded-full text-xs font-medium',
      statusStyles[status],
      className
    )}>
      {statusLabel[status]}
    </span>
  );
};

export default StatusBadge;
