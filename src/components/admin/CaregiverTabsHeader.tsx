
import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CaregiverTabsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddCaregiver: () => void;
}

const CaregiverTabsHeader: React.FC<CaregiverTabsHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onAddCaregiver,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
      <div>
        <TabsList>
          <TabsTrigger value="list">Caregiver List</TabsTrigger>
          <TabsTrigger value="workload">Workload Analysis</TabsTrigger>
          <TabsTrigger value="heatmap">Utilization Heatmap</TabsTrigger>
        </TabsList>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search caregivers..." 
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button 
          className="flex items-center whitespace-nowrap"
          onClick={onAddCaregiver}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Caregiver
        </Button>
      </div>
    </div>
  );
};

export default CaregiverTabsHeader;
