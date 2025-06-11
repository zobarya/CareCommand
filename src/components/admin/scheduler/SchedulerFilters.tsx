
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Plus } from 'lucide-react';
import { format, addWeeks, subWeeks } from 'date-fns';
import DateRangePicker from '@/components/admin/DateRangePicker';

interface SchedulerFiltersProps {
  selectedWeek: Date;
  selectedRegion: string;
  selectedSpecialization: string;
  onWeekChange: (week: Date) => void;
  onRegionChange: (region: string) => void;
  onSpecializationChange: (specialization: string) => void;
  onRefresh: () => void;
  onAddVisit?: () => void;
}

const SchedulerFilters: React.FC<SchedulerFiltersProps> = ({
  selectedWeek,
  selectedRegion,
  selectedSpecialization,
  onWeekChange,
  onRegionChange,
  onSpecializationChange,
  onRefresh,
  onAddVisit,
}) => {
  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north', label: 'North' },
    { value: 'central', label: 'Central' },
    { value: 'south', label: 'South' },
    { value: 'east', label: 'East' },
    { value: 'west', label: 'West' },
  ];

  const specializations = [
    { value: 'all', label: 'All Specializations' },
    { value: 'rn', label: 'Registered Nurse' },
    { value: 'lpn', label: 'Licensed Practical Nurse' },
    { value: 'cna', label: 'Certified Nursing Assistant' },
    { value: 'pt', label: 'Physical Therapist' },
    { value: 'ot', label: 'Occupational Therapist' },
  ];

  const weekStart = selectedWeek;
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  return (
    <div className="bg-white border-b p-4 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Weekly Scheduler</h2>
          <span className="text-sm text-muted-foreground">
            {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onWeekChange(subWeeks(selectedWeek, 1))}
          >
            Previous Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onWeekChange(new Date())}
          >
            This Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onWeekChange(addWeeks(selectedWeek, 1))}
          >
            Next Week
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedRegion} onValueChange={onRegionChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSpecialization} onValueChange={onSpecializationChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec.value} value={spec.value}>
                  {spec.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button onClick={onAddVisit} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Visit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchedulerFilters;
