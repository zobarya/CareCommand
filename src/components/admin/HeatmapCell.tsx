
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface HeatmapCellProps {
  hours: number;
  maxHours: number;
  visits: number;
  patients: number;
  date: string;
}

const HeatmapCell: React.FC<HeatmapCellProps> = ({ 
  hours, 
  maxHours, 
  visits, 
  patients, 
  date 
}) => {
  const utilizationPercent = maxHours > 0 ? (hours / maxHours) * 100 : 0;
  
  const getColorClass = () => {
    if (utilizationPercent === 0) return 'bg-gray-100 text-gray-400';
    if (utilizationPercent <= 25) return 'bg-gray-200 text-gray-600';
    if (utilizationPercent <= 60) return 'bg-green-200 text-green-800';
    if (utilizationPercent <= 90) return 'bg-yellow-200 text-yellow-800';
    return 'bg-red-200 text-red-800';
  };

  const getUtilizationSymbol = () => {
    if (utilizationPercent === 0) return '⚪';
    if (utilizationPercent <= 25) return '⚪';
    if (utilizationPercent <= 60) return '🟢';
    if (utilizationPercent <= 90) return '🟡';
    return '🔴';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            'w-full h-16 flex flex-col items-center justify-center rounded border cursor-pointer transition-all hover:scale-105',
            getColorClass()
          )}>
            <div className="text-lg">{getUtilizationSymbol()}</div>
            <div className="text-xs font-medium">
              {hours}h
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <div className="font-medium">{date}</div>
            <div>{hours} hrs · {visits} visits · {patients} patients</div>
            <div className="text-muted-foreground">
              {utilizationPercent.toFixed(0)}% utilization
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HeatmapCell;
