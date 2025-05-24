
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import AddCaregiverDialog from '@/components/admin/AddCaregiverDialog';
import EditCaregiverDialog from '@/components/admin/EditCaregiverDialog';
import CaregiverDetailsDialog from '@/components/admin/CaregiverDetailsDialog';
import CaregiverTable from '@/components/admin/CaregiverTable';
import CaregiverWorkloadView from '@/components/admin/CaregiverWorkloadView';
import CaregiverFilters from '@/components/admin/CaregiverFilters';
import WorkloadSummaryStats from '@/components/admin/WorkloadSummaryStats';
import WorkloadActions from '@/components/admin/WorkloadActions';
import WorkloadInsights from '@/components/admin/WorkloadInsights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCaregivers } from '@/hooks/useCaregivers';

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
    end: new Date(new Date().setDate(new Date().getDate() + 6)),
  });

  const { caregivers, handleUpdateCaregiver, handleAddCaregiver, regions, roles } = useCaregivers();

  const handleCaregiverClick = (caregiver: Caregiver) => {
    setSelectedCaregiver(caregiver);
    setIsDetailsCaregiverOpen(true);
  };

  const handleEditCaregiver = (caregiver: Caregiver, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedCaregiver(caregiver);
    setIsEditCaregiverOpen(true);
  };

  const handleRefreshData = () => {
    // In a real app, this would refetch data from the server
    console.log('Refreshing workload data...');
  };

  const filteredCaregivers = caregivers.filter(caregiver => {
    const matchesSearch = caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caregiver.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caregiver.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = region === 'all' || caregiver.region === region;
    const matchesRole = role === 'all' || caregiver.role.includes(role);
    
    return matchesSearch && matchesRegion && matchesRole;
  });

  const activeCaregivers = filteredCaregivers.filter(c => c.status === 'Active');
  const hasOverloadedStaff = activeCaregivers.some(c => 
    c.maxHours > 0 && (c.assignedHours / c.maxHours) >= 0.95
  );
  const hasUnderutilizedStaff = activeCaregivers.some(c => 
    c.maxHours > 0 && (c.assignedHours / c.maxHours) < 0.6
  );

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
          <CaregiverTable
            caregivers={filteredCaregivers}
            onCaregiverClick={handleCaregiverClick}
            onEditCaregiver={handleEditCaregiver}
          />
        </TabsContent>

        <TabsContent value="workload" className="space-y-6">
          <WorkloadSummaryStats caregivers={filteredCaregivers} />
          
          <WorkloadActions 
            onRefresh={handleRefreshData}
            hasOverloadedStaff={hasOverloadedStaff}
            hasUnderutilizedStaff={hasUnderutilizedStaff}
          />
          
          <WorkloadInsights caregivers={filteredCaregivers} />
          
          <CaregiverFilters
            region={region}
            role={role}
            dateRange={dateRange}
            regions={regions}
            roles={roles}
            onRegionChange={setRegion}
            onRoleChange={setRole}
            onDateRangeChange={setDateRange}
          />
          
          <CaregiverWorkloadView caregivers={filteredCaregivers} />
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
