import React from 'react';
import { User, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types/admin';

interface PatientSubTableProps {
  patients: Patient[];
  onPatientClick?: (patient: Patient) => void;
}

const PatientSubTable: React.FC<PatientSubTableProps> = ({ 
  patients, 
  onPatientClick 
}) => {
  if (patients.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No patients assigned
      </div>
    );
  }

  return (
    <div className="bg-muted/20 rounded-lg border border-muted/40 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left py-2 px-4 font-medium">Patient Name</th>
              <th className="text-left py-2 px-4 font-medium">Age</th>
              <th className="text-left py-2 px-4 font-medium">Care Plan</th>
              <th className="text-left py-2 px-4 font-medium">Status</th>
              <th className="text-left py-2 px-4 font-medium">Next Visit</th>
              <th className="text-right py-2 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr 
                key={patient.id} 
                className={`hover:bg-muted/30 cursor-pointer ${
                  index !== patients.length - 1 ? 'border-b border-muted/20' : ''
                }`}
                onClick={() => onPatientClick?.(patient)}
              >
                <td className="py-2 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-3 w-3 text-primary" />
                    </div>
                    <span className="font-medium">{patient.name}</span>
                  </div>
                </td>
                <td className="py-2 px-4">{patient.age}</td>
                <td className="py-2 px-4">{patient.carePlan}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    patient.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td className="py-2 px-4">{patient.nextVisit}</td>
                <td className="py-2 px-4 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPatientClick?.(patient);
                    }}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientSubTable;
