
import React, { useState } from 'react';
import { Pencil, Plus, Search, User } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import AddCaregiverDialog from '@/components/admin/AddCaregiverDialog';

const AdminCaregivers: React.FC = () => {
  const [isAddCaregiverOpen, setIsAddCaregiverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const caregivers = [
    {
      id: '1',
      name: 'Jane Doe',
      role: 'Registered Nurse',
      specialty: 'Geriatric Care',
      status: 'Active',
      patients: 6,
      availability: 'Full-time'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Home Health Aide',
      specialty: 'Physical Assistance',
      status: 'Active',
      patients: 8,
      availability: 'Part-time'
    },
    {
      id: '3',
      name: 'Sarah Williams',
      role: 'Licensed Practical Nurse',
      specialty: 'Wound Care',
      status: 'Active',
      patients: 5,
      availability: 'Full-time'
    },
    {
      id: '4',
      name: 'Robert Chen',
      role: 'Physical Therapist',
      specialty: 'Rehabilitation',
      status: 'Inactive',
      patients: 0,
      availability: 'On Leave'
    },
    {
      id: '5',
      name: 'Lisa Martinez',
      role: 'Registered Nurse',
      specialty: 'Pediatric Care',
      status: 'Active',
      patients: 4,
      availability: 'Full-time'
    },
  ];

  const filteredCaregivers = caregivers.filter(caregiver => 
    caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caregiver.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caregiver.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Caregivers" role="admin">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search caregivers..." 
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button 
          className="flex items-center whitespace-nowrap"
          onClick={() => setIsAddCaregiverOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Caregiver
        </Button>
      </div>

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
              {filteredCaregivers.map(caregiver => (
                <tr key={caregiver.id} className="border-b border-gray-100 hover:bg-gray-50">
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
                    <button className="text-gray-600 hover:text-primary">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddCaregiverDialog open={isAddCaregiverOpen} onOpenChange={setIsAddCaregiverOpen} />
    </Layout>
  );
};

export default AdminCaregivers;
