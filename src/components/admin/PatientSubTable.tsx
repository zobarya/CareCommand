
import React from 'react';
import { User, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
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
        <Table className="text-sm">
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="text-left font-medium">Patient Name</TableHead>
              <TableHead className="text-left font-medium">Age</TableHead>
              <TableHead className="text-left font-medium">Care Plan</TableHead>
              <TableHead className="text-left font-medium">Status</TableHead>
              <TableHead className="text-left font-medium">Next Visit</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow 
                key={patient.id}
                className="hover:bg-muted/30 cursor-pointer"
                onClick={() => onPatientClick?.(patient)}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-3 w-3 text-primary" />
                    </div>
                    <span className="font-medium">{patient.name}</span>
                  </div>
                </TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.carePlan}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    patient.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {patient.status}
                  </span>
                </TableCell>
                <TableCell>{patient.nextVisit}</TableCell>
                <TableCell className="text-right">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientSubTable;
