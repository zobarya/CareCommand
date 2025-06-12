
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addWeeks, subWeeks } from 'date-fns';
import { cn } from '@/lib/utils';

interface HeatmapFiltersProps {
  weekStartDate: Date;
  region: string;
  role: string;
  showOverbookedOnly: boolean;
  regions: string[];
  roles: string[];
  onWeekChange: (date: Date) => void;
  onRegionChange: (region: string) => void;
  onRoleChange: (role: string) => void;
  onShowOverbookedToggle: (checked: boolean) => void;
}

const HeatmapFilters: React.FC<HeatmapFiltersProps> = ({
  weekStartDate,
  region,
  role,
  showOverbookedOnly,
  regions,
  roles,
  onWeekChange,
  onRegionChange,
  onRoleChange,
  onShowOverbookedToggle,
}) => {
  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Week Navigation */}
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium">Week:</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onWeekChange(subWeeks(weekStartDate, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-48 justify-start text-left font-normal",
                  !weekStartDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {weekStartDate ? format(weekStartDate, "MMM d, yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={weekStartDate}
                onSelect={(date) => date && onWeekChange(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onWeekChange(addWeeks(weekStartDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium">Region:</Label>
          <Select value={region} onValueChange={onRegionChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map(r => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Role Filter */}
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium">Role:</Label>
          <Select value={role} onValueChange={onRoleChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map(r => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Show Overbooked Only Toggle */}
        <div className="flex items-center gap-2">
          <Switch
            id="overbooked-only"
            checked={showOverbookedOnly}
            onCheckedChange={onShowOverbookedToggle}
          />
          <Label htmlFor="overbooked-only" className="text-sm font-medium">
            Show Overbooked Only
          </Label>
        </div>
      </div>
    </div>
  );
};

export default HeatmapFilters;
