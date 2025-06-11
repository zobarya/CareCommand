
import React from 'react';
import { format, addWeeks, subWeeks } from 'date-fns';
import { ChevronLeft, ChevronRight, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SchedulerFiltersProps {
  selectedWeek: Date;
  selectedRegion: string;
  selectedSpecialization: string;
  onWeekChange: (week: Date) => void;
  onRegionChange: (region: string) => void;
  onSpecializationChange: (specialization: string) => void;
  onRefresh: () => void;
  onAddVisit?: () => void;
  showAddButton?: boolean;
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
  showAddButton = true,
}) => {
  return (
    <div className="bg-white border-b p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Week Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onWeekChange(subWeeks(selectedWeek, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-medium whitespace-nowrap">
              Week of {format(selectedWeek, 'MMM d, yyyy')}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onWeekChange(addWeeks(selectedWeek, 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Select value={selectedRegion} onValueChange={onRegionChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North</SelectItem>
                <SelectItem value="central">Central</SelectItem>
                <SelectItem value="south">South</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSpecialization} onValueChange={onSpecializationChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="rn">RN</SelectItem>
                <SelectItem value="lpn">LPN</SelectItem>
                <SelectItem value="cna">CNA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          {showAddButton && onAddVisit && (
            <Button size="sm" onClick={onAddVisit}>
              <Plus className="w-4 h-4 mr-2" />
              Add Visit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulerFilters;
