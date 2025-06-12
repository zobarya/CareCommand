
import React from 'react';
import { ChevronDown, ChevronRight, User, Pencil } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import PatientSubTable from './PatientSubTable';
import { Patient, Caregiver } from '@/types/admin';

interface ExpandableCaregiverRowProps {
  caregiver: Caregiver;
  isExpanded: boolean;
  onToggle: () => void;
  onCaregiverClick: (caregiver: Caregiver) => void;
  onEditCaregiver: (caregiver: Caregiver, e?: React.MouseEvent) => void;
  onPatientClick?: (patient: Patient) => void;
}

const ExpandableCaregiverRow: React.FC<ExpandableCaregiverRowProps> = ({
  caregiver,
  isExpanded,
  onToggle,
  onCaregiverClick,
  onEditCaregiver,
  onPatientClick,
}) => {
  const patientCount = caregiver.patientsList.length;

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer group">
          <td className="py-3 px-4">
            <div className="flex items-center">
              <div className="mr-2 text-gray-400 group-hover:text-gray-600">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
                <User className="h-4 w-4" />
              </div>
              <div>
                <span className="font-medium">{caregiver.name}</span>
                {patientCount > 0 && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {patientCount} patients
                  </span>
                )}
              </div>
            </div>
          </td>
          <td className="py-3 px-4">{caregiver.role}</td>
          <td className="py-3 px-4">{caregiver.specialty}</td>
          <td className="py-3 px-4">
            <span className={`px-2 py-1 rounded-full text-xs ${
              caregiver.status === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {caregiver.status}
            </span>
          </td>
          <td className="py-3 px-4">{patientCount}</td>
          <td className="py-3 px-4">{caregiver.availability}</td>
          <td className="py-3 px-4 text-right">
            <button 
              className="text-gray-600 hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                onEditCaregiver(caregiver, e);
              }}
            >
              <Pencil className="h-4 w-4" />
            </button>
          </td>
        </tr>
      </CollapsibleTrigger>
      
      {patientCount > 0 && (
        <CollapsibleContent asChild>
          <tr>
            <td colSpan={7} className="p-0">
              <div className="px-4 pb-4 pt-2 bg-gray-50/50">
                <div className="ml-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Assigned Patients ({patientCount})
                  </h4>
                  <PatientSubTable 
                    patients={caregiver.patientsList} 
                    onPatientClick={onPatientClick}
                  />
                </div>
              </div>
            </td>
          </tr>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

export default ExpandableCaregiverRow;
