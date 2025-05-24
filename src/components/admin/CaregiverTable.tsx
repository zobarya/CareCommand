
import React from 'react';
import { Pencil, User } from 'lucide-react';

interface Caregiver {
  id: string;
  name: string;
  role: string;
  specialty: string;
  status: string;
  patients: number;
  availability: string;
  region: string;
  assignedHours: number;
  maxHours: number;
  visits: number;
  photo: string;
}

interface CaregiverTableProps {
  caregivers: Caregiver[];
  onCaregiverClick: (caregiver: Caregiver) => void;
  onEditCaregiver: (caregiver: Caregiver, e?: React.MouseEvent) => void;
}

const CaregiverTable: React.FC<CaregiverTableProps> = ({
  caregivers,
  onCaregiverClick,
  onEditCaregiver,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
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
              <tr 
                key={caregiver.id} 
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => onCaregiverClick(caregiver)}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{caregiver.name}</span>
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
                <td className="py-3 px-4">{caregiver.patients}</td>
                <td className="py-3 px-4">{caregiver.availability}</td>
                <td className="py-3 px-4 text-right">
                  <button 
                    className="text-gray-600 hover:text-primary"
                    onClick={(e) => onEditCaregiver(caregiver, e)}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaregiverTable;
