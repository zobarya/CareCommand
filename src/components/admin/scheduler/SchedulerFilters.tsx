
import React from 'react';
import { format, addWeeks, subWeeks } from 'date-fns';
import { ChevronLeft, ChevronRight, RefreshCw, Info, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  searchTerm: string;
  groupByRegion: boolean;
  onWeekChange: (week: Date) => void;
  onRegionChange: (region: string) => void;
  onSpecializationChange: (specialization: string) => void;
  onSearchChange: (search: string) => void;
  onGroupByRegionToggle: () => void;
  onRefresh: () => void;
}

const SchedulerFilters: React.FC<SchedulerFiltersProps> = ({
  selectedWeek,
  selectedRegion,
  selectedSpecialization,
  searchTerm,
  groupByRegion,
  onWeekChange,
  onRegionChange,
  onSpecializationChange,
  onSearchChange,
  onGroupByRegionToggle,
  onRefresh,
}) => {
  return (
    <div className="bg-background border-b p-4 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
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

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search caregivers by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={selectedRegion} onValueChange={onRegionChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="north">North</SelectItem>
              <SelectItem value="central">Central</SelectItem>
              <SelectItem value="south">South</SelectItem>
              <SelectItem value="east">East</SelectItem>
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

          <Button
            variant={groupByRegion ? "default" : "outline"}
            size="sm"
            onClick={onGroupByRegionToggle}
          >
            <Users className="w-4 h-4 mr-2" />
            Group by Region
          </Button>
        </div>
      </div>

      {/* Help Text */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Info className="w-4 h-4" />
        <span>Click empty slots to schedule visits • Drag visits from unassigned panel to assign</span>
      </div>
    </div>
  );
};

export default SchedulerFilters;
