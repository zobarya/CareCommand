
import React, { useState } from 'react';
import { Pencil, Plus, Search, User } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import AddPatientDialog from '@/components/admin/AddPatientDialog';
import { Button } from '@/components/ui/button';

const AdminPatients: React.FC = () => {
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const patients = [
    {
      id: '1',
      name: 'John Smith',
      age: 78,
      carePlan: 'Comprehensive',
      status: 'Active',
      caregiver: 'Jane Doe, RN',
      nextVisit: 'Today, 9:00 AM'
    },
    {
      id: '2',
      name: 'Emma Wilson',
      age: 65,
      carePlan: 'Basic',
      status: 'Active',
      caregiver: 'Mike Johnson, HHA',
      nextVisit: 'Today, 11:30 AM'
    },
    {
      id: '3',
      name: 'Robert Brown',
      age: 82,
      carePlan: 'Advanced',
      status: 'Active',
      caregiver: 'Jane Doe, RN',
      nextVisit: 'Tomorrow, 10:00 AM'
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      age: 71,
      carePlan: 'Comprehensive',
      status: 'Active',
      caregiver: 'Jane Doe, RN',
      nextVisit: 'May 27, 2:00 PM'
    },
    {
      id: '5',
      name: 'Michael Roberts',
      age: 68,
      carePlan: 'Basic',
      status: 'Inactive',
      caregiver: 'Not Assigned',
      nextVisit: 'None'
    },
  ];

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.caregiver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Patients" role="admin">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button 
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap"
          onClick={() => setIsAddPatientOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Age</th>
                <th className="text-left py-3 px-4">Care Plan</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Primary Caregiver</th>
                <th className="text-left py-3 px-4">Next Visit</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent mr-3">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{patient.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{patient.age}</td>
                  <td className="py-3 px-4">{patient.carePlan}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      patient.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{patient.caregiver}</td>
                  <td className="py-3 px-4">{patient.nextVisit}</td>
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
      
      <AddPatientDialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen} />
    </Layout>
  );
};

export default AdminPatients;
