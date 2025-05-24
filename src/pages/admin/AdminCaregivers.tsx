import React, { useState } from 'react';
import { Pencil, Plus, Search, User, Calendar, Filter } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import AddCaregiverDialog from '@/components/admin/AddCaregiverDialog';
import EditCaregiverDialog from '@/components/admin/EditCaregiverDialog';
import CaregiverDetailsDialog from '@/components/admin/CaregiverDetailsDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import WorkloadCard from '@/components/admin/WorkloadCard';
import { Progress } from '@/components/ui/progress';
import DateRangePicker from '@/components/admin/DateRangePicker';

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

const AdminCaregivers: React.FC = () => {
  const [isAddCaregiverOpen, setIsAddCaregiverOpen] = useState(false);
  const [isEditCaregiverOpen, setIsEditCaregiverOpen] = useState(false);
  const [isDetailsCaregiverOpen, setIsDetailsCaregiverOpen] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<'list' | 'workload'>('list');
  const [region, setRegion] = useState<string>('all');
  const [role, setRole] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 6)), // Default to current week
  });

  // Mock data with state management
  const [caregivers, setCaregivers] = useState<Caregiver[]>([
    {
      id: '1',
      name: 'Jane Doe',
      role: 'Registered Nurse',
      specialty: 'Geriatric Care',
      status: 'Active',
      patients: 6,
      availability: 'Full-time',
      region: 'North',
      assignedHours: 38,
      maxHours: 40,
      visits: 12,
      photo: 'JD'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Home Health Aide',
      specialty: 'Physical Assistance',
      status: 'Active',
      patients: 8,
      availability: 'Part-time',
      region: 'South',
      assignedHours: 22,
      maxHours: 25,
      visits: 10,
      photo: 'MJ'
    },
    {
      id: '3',
      name: 'Sarah Williams',
      role: 'Licensed Practical Nurse',
      specialty: 'Wound Care',
      status: 'Active',
      patients: 5,
      availability: 'Full-time',
      region: 'East',
      assignedHours: 35,
      maxHours: 40,
      visits: 8,
      photo: 'SW'
    },
    {
      id: '4',
      name: 'Robert Chen',
      role: 'Physical Therapist',
      specialty: 'Rehabilitation',
      status: 'Inactive',
      patients: 0,
      availability: 'On Leave',
      region: 'West',
      assignedHours: 0,
      maxHours: 0,
      visits: 0,
      photo: 'RC'
    },
    {
      id: '5',
      name: 'Lisa Martinez',
      role: 'Registered Nurse',
      specialty: 'Pediatric Care',
      status: 'Active',
      patients: 4,
      availability: 'Full-time',
      region: 'Central',
      assignedHours: 42,
      maxHours: 40,
      visits: 14,
      photo: 'LM'
    },
  ]);

  const handleCaregiverClick = (caregiver: Caregiver) => {
    setSelectedCaregiver(caregiver);
    setIsDetailsCaregiverOpen(true);
  };

  const handleEditCaregiver = (caregiver: Caregiver, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent row click when clicking edit button
    }
    setSelectedCaregiver(caregiver);
    setIsEditCaregiverOpen(true);
  };

  const handleUpdateCaregiver = (updatedCaregiver: Caregiver) => {
    setCaregivers(prev => prev.map(c => c.id === updatedCaregiver.id ? updatedCaregiver : c));
  };

  const handleAddCaregiver = (newCaregiverData: any) => {
    const newCaregiver: Caregiver = {
      id: (caregivers.length + 1).toString(),
      name: `${newCaregiverData.firstName} ${newCaregiverData.lastName}`,
      role: newCaregiverData.role,
      specialty: newCaregiverData.specialty || 'General Care',
      status: 'Active',
      patients: 0,
      availability: newCaregiverData.availability.charAt(0).toUpperCase() + newCaregiverData.availability.slice(1),
      region: 'Central',
      assignedHours: 0,
      maxHours: newCaregiverData.availability === 'full-time' ? 40 : 25,
      visits: 0,
      photo: `${newCaregiverData.firstName.charAt(0)}${newCaregiverData.lastName.charAt(0)}`
    };
    setCaregivers(prev => [...prev, newCaregiver]);
  };

  const filteredCaregivers = caregivers.filter(caregiver => {
    const matchesSearch = caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caregiver.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caregiver.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = region === 'all' || caregiver.region === region;
    const matchesRole = role === 'all' || caregiver.role.includes(role);
    
    return matchesSearch && matchesRegion && matchesRole;
  });

  const regions = Array.from(new Set(caregivers.map(c => c.region)));
  const roles = Array.from(new Set(caregivers.map(c => c.role)));

  const getStatusFromLoad = (assigned: number, max: number) => {
    if (max === 0) return { label: 'Inactive', color: 'bg-gray-100 text-gray-800' };
    const load = (assigned / max) * 100;
    if (load >= 95) return { label: 'Overloaded', color: 'bg-red-100 text-red-800' };
    if (load >= 75) return { label: 'Near Limit', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Normal', color: 'bg-green-100 text-green-800' };
  };

  return (
    <Layout title="Caregivers" role="admin">
      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'list' | 'workload')} className="w-full">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div>
            <TabsList>
              <TabsTrigger value="list">Caregiver List</TabsTrigger>
              <TabsTrigger value="workload">Workload Analysis</TabsTrigger>
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              className="flex items-center whitespace-nowrap"
              onClick={() => setIsAddCaregiverOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Caregiver
            </Button>
          </div>
        </div>

        <TabsContent value="list">
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
                    <tr 
                      key={caregiver.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleCaregiverClick(caregiver)}
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
                          onClick={(e) => handleEditCaregiver(caregiver, e)}
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
        </TabsContent>

        <TabsContent value="workload">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <DateRangePicker 
                  dateRange={dateRange}
                  onUpdate={setDateRange}
                />
                
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map((r) => (
                      <SelectItem key={r} value={r}>{r} Region</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCaregivers.map((caregiver) => {
              const loadStatus = getStatusFromLoad(caregiver.assignedHours, caregiver.maxHours);
              const loadPercentage = caregiver.maxHours ? (caregiver.assignedHours / caregiver.maxHours) * 100 : 0;
              
              return (
                <WorkloadCard
                  key={caregiver.id}
                  caregiver={caregiver}
                  loadStatus={loadStatus}
                  loadPercentage={loadPercentage}
                />
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <AddCaregiverDialog 
        open={isAddCaregiverOpen} 
        onOpenChange={setIsAddCaregiverOpen}
        onAdd={handleAddCaregiver}
      />
      <EditCaregiverDialog 
        open={isEditCaregiverOpen} 
        onOpenChange={setIsEditCaregiverOpen}
        caregiver={selectedCaregiver}
        onUpdate={handleUpdateCaregiver}
      />
      <CaregiverDetailsDialog 
        open={isDetailsCaregiverOpen} 
        onOpenChange={setIsDetailsCaregiverOpen}
        caregiver={selectedCaregiver}
      />
    </Layout>
  );
};

export default AdminCaregivers;
