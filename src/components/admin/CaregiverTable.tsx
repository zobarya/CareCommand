
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

  const handleRowToggle = (caregiverId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(caregiverId)) {
      newExpandedRows.delete(caregiverId);
    } else {
      newExpandedRows.add(caregiverId);
    }
    setExpandedRows(newExpandedRows);
  };

  const hasExpandableRows = caregivers.some(c => c.patientsList.length > 0);
  const expandableCaregiversCount = caregivers.filter(c => c.patientsList.length > 0).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      {hasExpandableRows && (
        <div className="flex gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExpandAll}
            disabled={expandedRows.size === expandableCaregiversCount}
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-left">Role</TableHead>
              <TableHead className="text-left">Specialty</TableHead>
              <TableHead className="text-left">Status</TableHead>
              <TableHead className="text-left">Patients</TableHead>
              <TableHead className="text-left">Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caregivers.map(caregiver => (
              <ExpandableCaregiverRow
                key={caregiver.id}
                caregiver={caregiver}
                isExpanded={expandedRows.has(caregiver.id)}
                onToggle={() => handleRowToggle(caregiver.id)}
                onCaregiverClick={onCaregiverClick}
                onEditCaregiver={onEditCaregiver}
                onPatientClick={onPatientClick}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CaregiverTable;
