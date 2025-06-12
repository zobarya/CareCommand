import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpandableCaregiverRow from './ExpandableCaregiverRow';
import { Patient, Caregiver } from '@/types/admin';

interface CaregiverTableProps {
  caregivers: Caregiver[];
  onCaregiverClick: (caregiver: Caregiver) => void;
  onEditCaregiver: (caregiver: Caregiver, e?: React.MouseEvent) => void;
  onPatientClick?: (patient: Patient) => void;
}

const CaregiverTable: React.FC<CaregiverTableProps> = ({
  caregivers,
  onCaregiverClick,
  onEditCaregiver,
  onPatientClick,
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleExpandAll = () => {
    const caregiverIds = caregivers.filter(c => c.patientsList.length > 0).map(c => c.id);
    setExpandedRows(new Set(caregiverIds));
  };

  const handleCollapseAll = () => {
    setExpandedRows(new Set());
  };

  const hasExpandableRows = caregivers.some(c => c.patientsList.length > 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      {hasExpandableRows && (
        <div className="flex gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExpandAll}
            disabled={expandedRows.size === caregivers.filter(c => c.patientsList.length > 0).length}
          >
            <ChevronDown className="h-4 w-4 mr-1" />
            Expand All
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCollapseAll}
            disabled={expandedRows.size === 0}
          >
            <ChevronUp className="h-4 w-4 mr-1" />
            Collapse All
          </Button>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Role</th>
              <th className="text-left py-3 px-4">Specialty</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Patients</th>
              <th className="text-left py-3 px-4">Availability</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {caregivers.map(caregiver => (
              <ExpandableCaregiverRow
                key={caregiver.id}
                caregiver={caregiver}
                onCaregiverClick={onCaregiverClick}
                onEditCaregiver={onEditCaregiver}
                onPatientClick={onPatientClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaregiverTable;
