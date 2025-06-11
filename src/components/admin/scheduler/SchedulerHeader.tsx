
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Search, 
  Users
} from 'lucide-react';
import { SchedulerHeaderProps } from './types';

const SchedulerHeader: React.FC<SchedulerHeaderProps> = ({
  searchTerm,
  regionFilter,
  roleFilter,
  groupByRegion,
  regions,
  roles,
  caregiverCount,
  onSearchChange,
  onRegionFilterChange,
  onRoleFilterChange,
  onGroupByRegionToggle,
}) => {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search caregivers by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <Select value={regionFilter} onValueChange={onRegionFilterChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Regions</SelectItem>
          {regions.map(region => (
            <SelectItem key={region} value={region}>{region}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={roleFilter} onValueChange={onRoleFilterChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          {roles.map(role => (
            <SelectItem key={role} value={role}>{role}</SelectItem>
          ))}
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
  );
};

export default SchedulerHeader;
