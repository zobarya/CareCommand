
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, RefreshCw, Filter } from 'lucide-react';
import DateRangePicker from '@/components/admin/DateRangePicker';
import { format, startOfWeek, endOfWeek } from 'date-fns';

interface SchedulerFiltersProps {
  selectedWeek: Date;
  selectedRegion: string;
  selectedSpecialization: string;
  onWeekChange: (date: Date) => void;
  onRegionChange: (region: string) => void;
  onSpecializationChange: (specialization: string) => void;
  onRefresh: () => void;
}

const SchedulerFilters: React.FC<SchedulerFiltersProps> = ({
  selectedWeek,
  selectedRegion,
  selectedSpecialization,
  onWeekChange,
  onRegionChange,
  onSpecializationChange,
  onRefresh,
}) => {
  const weekStart = startOfWeek(selectedWeek);
  const weekEnd = endOfWeek(selectedWeek);

  const regions = ['North', 'South', 'East', 'West', 'Central'];
  const specializations = ['RN', 'LPN', 'CNA', 'HHA', 'PT', 'OT', 'ST'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold">Enhanced Scheduler</h3>
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <DateRangePicker
            dateRange={{ start: weekStart, end: weekEnd }}
            onUpdate={({ start }) => onWeekChange(start)}
          />
          
          <Select value={selectedRegion} onValueChange={onRegionChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region.toLowerCase()}>
                  {region} Region
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedSpecialization} onValueChange={onSpecializationChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Specializations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec.toLowerCase()}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchedulerFilters;
