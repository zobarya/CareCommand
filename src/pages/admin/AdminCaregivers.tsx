
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import AddCaregiverDialog from '@/components/admin/AddCaregiverDialog';
import EditCaregiverDialog from '@/components/admin/EditCaregiverDialog';
import CaregiverDetailsDialog from '@/components/admin/CaregiverDetailsDialog';
import PatientDetailsDialog from '@/components/admin/PatientDetailsDialog';
import CaregiverTable from '@/components/admin/CaregiverTable';
import CaregiverWorkloadView from '@/components/admin/CaregiverWorkloadView';
import CaregiverFilters from '@/components/admin/CaregiverFilters';
import WorkloadSummaryStats from '@/components/admin/WorkloadSummaryStats';
import WorkloadActions from '@/components/admin/WorkloadActions';
import WorkloadInsights from '@/components/admin/WorkloadInsights';
import CaregiverUtilizationHeatmap from '@/components/admin/CaregiverUtilizationHeatmap';
import HeatmapFilters from '@/components/admin/HeatmapFilters';
import CaregiverTabsHeader from '@/components/admin/CaregiverTabsHeader';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useCaregivers } from '@/hooks/useCaregivers';
import { useCaregiverManagement } from '@/hooks/useCaregiverManagement';
import { useCaregiverFilters } from '@/hooks/useCaregiverFilters';

const AdminCaregivers: React.FC = () => {
  const [activeView, setActiveView] = useState<'list' | 'workload' | 'heatmap'>('list');
  
  const { caregivers, handleUpdateCaregiver, handleAddCaregiver, regions, roles } = useCaregivers();
  
  const {
    isAddCaregiverOpen,
    isEditCaregiverOpen,
    isDetailsCaregiverOpen,
    isPatientDetailsOpen,
    selectedCaregiver,
    selectedPatient,
    setIsAddCaregiverOpen,
    setIsEditCaregiverOpen,
    setIsDetailsCaregiverOpen,
    setIsPatientDetailsOpen,
    handleCaregiverClick,
    handleEditCaregiver,
    handlePatientClick,
  } = useCaregiverManagement(caregivers);

  const {
    searchTerm,
    region,
    role,
    dateRange,
    heatmapWeekStart,
    showOverbookedOnly,
    setSearchTerm,
    setRegion,
    setRole,
    setDateRange,
    setHeatmapWeekStart,
    setShowOverbookedOnly,
    filterCaregivers,
  } = useCaregiverFilters();

  const handleRefreshData = () => {
    console.log('Refreshing workload data...');
  };

  const filteredCaregivers = filterCaregivers(caregivers, activeView);
  const activeCaregivers = filteredCaregivers.filter(c => c.status === 'Active');
  const hasOverloadedStaff = activeCaregivers.some(c => 
    c.maxHours > 0 && (c.assignedHours / c.maxHours) >= 0.95
  );
  const hasUnderutilizedStaff = activeCaregivers.some(c => 
    c.maxHours > 0 && (c.assignedHours / c.maxHours) < 0.6
  );

  return (
    <Layout title="Caregivers" role="admin">
      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'list' | 'workload' | 'heatmap')} className="w-full">
        <CaregiverTabsHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddCaregiver={() => setIsAddCaregiverOpen(true)}
        />

        <TabsContent value="list">
          <CaregiverTable
            caregivers={filteredCaregivers}
            onCaregiverClick={handleCaregiverClick}
            onEditCaregiver={handleEditCaregiver}
            onPatientClick={handlePatientClick}
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

        <TabsContent value="heatmap" className="space-y-6">
          <HeatmapFilters
            weekStartDate={heatmapWeekStart}
            region={region}
            role={role}
            showOverbookedOnly={showOverbookedOnly}
            regions={regions}
            roles={roles}
            onWeekChange={setHeatmapWeekStart}
            onRegionChange={setRegion}
            onRoleChange={setRole}
            onShowOverbookedToggle={setShowOverbookedOnly}
          />
          
          <CaregiverUtilizationHeatmap
            caregivers={filteredCaregivers}
            weekStartDate={heatmapWeekStart}
          />
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
      <PatientDetailsDialog 
        open={isPatientDetailsOpen} 
        onOpenChange={setIsPatientDetailsOpen}
        patient={selectedPatient}
      />
    </Layout>
  );
};

export default AdminCaregivers;
