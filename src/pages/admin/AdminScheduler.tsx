
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SchedulerFilters from '@/components/admin/scheduler/SchedulerFilters';
import WeekViewScheduler from '@/components/admin/scheduler/WeekViewScheduler';
import UnassignedVisitsSidebar from '@/components/admin/scheduler/UnassignedVisitsSidebar';
import CaregiverSuggestionsModal from '@/components/admin/scheduler/CaregiverSuggestionsModal';
import AddVisitDialog from '@/components/admin/AddVisitDialog';
import { useSchedulerData } from '@/hooks/useSchedulerData';

const AdminScheduler: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAddVisit, setShowAddVisit] = useState(false);

  const {
    caregivers,
    scheduledVisits,
    unassignedVisits,
    assignVisit,
    moveVisit,
    refreshData
  } = useSchedulerData(selectedWeek, selectedRegion, selectedSpecialization);

  const handleAssignVisit = (visitId: string, caregiverId: string, timeSlot: string) => {
    assignVisit(visitId, caregiverId, timeSlot);
    setShowSuggestions(false);
    setSelectedVisit(null);
  };

  const handleVisitSelect = (visit: any) => {
    setSelectedVisit(visit);
    setShowSuggestions(true);
  };

  const handleAddNewVisit = () => {
    setShowAddVisit(true);
  };

  const handleAddVisit = (visitData: any) => {
    // In a real app, this would make an API call
    console.log('Adding new visit:', visitData);
    refreshData(); // Refresh the data to show the new visit
  };

  return (
    <Layout title="Enhanced Scheduler" role="admin">
      <div className="flex flex-col h-full">
        <SchedulerFilters
          selectedWeek={selectedWeek}
          selectedRegion={selectedRegion}
          selectedSpecialization={selectedSpecialization}
          onWeekChange={setSelectedWeek}
          onRegionChange={setSelectedRegion}
          onSpecializationChange={setSelectedSpecialization}
          onRefresh={refreshData}
          onAddVisit={handleAddNewVisit}
        />
        
        <div className="flex flex-1 gap-4 overflow-hidden">
          <div className="flex-1">
            <WeekViewScheduler
              caregivers={caregivers}
              scheduledVisits={scheduledVisits}
              selectedWeek={selectedWeek}
              onVisitMove={moveVisit}
              onVisitSelect={handleVisitSelect}
            />
          </div>
          
          <UnassignedVisitsSidebar
            visits={unassignedVisits}
            onVisitSelect={handleVisitSelect}
            onAddNewVisit={handleAddNewVisit}
          />
        </div>
      </div>

      <CaregiverSuggestionsModal
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        visit={selectedVisit}
        onAssign={handleAssignVisit}
      />

      <AddVisitDialog
        open={showAddVisit}
        onOpenChange={setShowAddVisit}
        onAdd={handleAddVisit}
      />
    </Layout>
  );
};

export default AdminScheduler;
