
import React from 'react';
import { cn } from '@/lib/utils';

interface CardStatProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const CardStat: React.FC<CardStatProps> = ({ 
  title, 
  value, 
  icon,
  trend,
  className 
}) => {
  return (
    <div className={cn(
      'bg-white rounded-lg p-4 shadow-sm border border-gray-100',
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          
          {trend && (
            <div className="flex items-center space-x-1">
              <span className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500">from last month</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardStat;
