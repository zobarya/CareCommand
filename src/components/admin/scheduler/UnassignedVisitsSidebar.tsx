
import React from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import VisitCard from './VisitCard';
import { Button } from '@/components/ui/button';

interface UnassignedVisit {
  id: string;
  patientName: string;
  serviceType: string;
  date: string;
  startTime: string;
  duration: number;
  status: 'unassigned';
  priority: 'high' | 'medium' | 'low';
  notes?: string;
}

interface UnassignedVisitsSidebarProps {
  visits: UnassignedVisit[];
  onVisitSelect: (visit: UnassignedVisit) => void;
  onAddNewVisit?: () => void;
}

const UnassignedVisitsSidebar: React.FC<UnassignedVisitsSidebarProps> = ({
  visits,
  onVisitSelect,
  onAddNewVisit,
}) => {
  const highPriorityVisits = visits.filter(v => v.priority === 'high');
  const otherVisits = visits.filter(v => v.priority !== 'high');

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Unassigned Visits</h3>
          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
            {visits.length}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {highPriorityVisits.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <h4 className="font-medium text-red-700">High Priority</h4>
            </div>
            <div className="space-y-2">
              {highPriorityVisits.map((visit) => (
                <VisitCard
                  key={visit.id}
                  visit={visit}
                  onClick={() => onVisitSelect(visit)}
                  isDraggable
                />
              ))}
            </div>
          </div>
        )}
        
        {otherVisits.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Other Visits</h4>
            <div className="space-y-2">
              {otherVisits.map((visit) => (
                <VisitCard
                  key={visit.id}
                  visit={visit}
                  onClick={() => onVisitSelect(visit)}
                  isDraggable
                />
              ))}
            </div>
          </div>
        )}
        
        {visits.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No unassigned visits</p>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t">
        <Button 
          variant="outline" 
          className="w-full" 
          size="sm"
          onClick={onAddNewVisit}
        >
          Add New Visit
        </Button>
      </div>
    </div>
  );
};

export default UnassignedVisitsSidebar;
