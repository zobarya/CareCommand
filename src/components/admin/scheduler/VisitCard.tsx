
import React from 'react';
import { Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface VisitCardProps {
  visit: {
    id: string;
    patientName: string;
    serviceType: string;
    startTime: string;
    duration: number;
    status: 'scheduled' | 'unassigned' | 'conflict';
    notes?: string;
  };
  onClick?: () => void;
  isDraggable?: boolean;
  onDragEnd?: (newCaregiverId: string, newTimeSlot: string) => void;
  className?: string;
}

const VisitCard: React.FC<VisitCardProps> = ({
  visit,
  onClick,
  isDraggable,
  onDragEnd,
  className,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'unassigned':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'conflict':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (!isDraggable) return;
    e.dataTransfer.setData('text/plain', visit.id);
  };

  const cardContent = (
    <div
      className={cn(
        'p-2 rounded border cursor-pointer text-xs transition-all hover:shadow-md',
        getStatusColor(visit.status),
        isDraggable && 'cursor-move',
        className
      )}
      onClick={onClick}
      draggable={isDraggable}
      onDragStart={handleDragStart}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center space-x-1">
          <User className="h-3 w-3" />
          <span className="font-medium truncate">{visit.patientName}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-600">
          <Clock className="h-3 w-3" />
          <span>{visit.startTime}</span>
        </div>
      </div>
      <div className="text-gray-700">
        <p className="truncate">{visit.serviceType}</p>
        <p>{visit.duration}min</p>
      </div>
    </div>
  );

  if (visit.notes) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {cardContent}
          </TooltipTrigger>
          <TooltipContent>
            <div className="max-w-xs">
              <p className="font-medium">{visit.patientName}</p>
              <p>{visit.serviceType}</p>
              <p>{visit.startTime} • {visit.duration} minutes</p>
              {visit.notes && <p className="mt-1 text-sm">{visit.notes}</p>}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return cardContent;
};

export default VisitCard;
