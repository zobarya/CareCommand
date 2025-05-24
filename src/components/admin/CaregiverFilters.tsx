
import React from 'react';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DateRangePicker from '@/components/admin/DateRangePicker';

interface CaregiverFiltersProps {
  region: string;
  role: string;
  dateRange: { start: Date; end: Date };
  regions: string[];
  roles: string[];
  onRegionChange: (region: string) => void;
  onRoleChange: (role: string) => void;
  onDateRangeChange: (dateRange: { start: Date; end: Date }) => void;
}

const CaregiverFilters: React.FC<CaregiverFiltersProps> = ({
  region,
  role,
  dateRange,
  regions,
  roles,
  onRegionChange,
  onRoleChange,
  onDateRangeChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <DateRangePicker 
            dateRange={dateRange}
            onUpdate={onDateRangeChange}
          />
          
          <Select value={region} onValueChange={onRegionChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>{r} Region</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={role} onValueChange={onRoleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CaregiverFilters;
