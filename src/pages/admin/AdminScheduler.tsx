
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SchedulerFilters from '@/components/admin/scheduler/SchedulerFilters';
import WeekViewScheduler from '@/components/admin/scheduler/WeekViewScheduler';
import UnassignedVisitsSidebar from '@/components/admin/scheduler/UnassignedVisitsSidebar';
import CaregiverSuggestionsModal from '@/components/admin/scheduler/CaregiverSuggestionsModal';
import AssignVisitModal from '@/components/admin/scheduler/AssignVisitModal';
import { useSchedulerData } from '@/hooks/useSchedulerData';

const AdminScheduler: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    caregiverId: string;
    caregiverName: string;
    date: string;
    time: string;
  } | null>(null);

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

  const handleVisitAssignFromCalendar = (visitData: any) => {
    // Add the new visit to scheduled visits or unassigned based on assignment status
    console.log('Adding visit from calendar click:', visitData);
    
    // In a real app, this would make an API call
    // For now, we'll just refresh the data to simulate the update
    refreshData();
  };

  const handleSlotClick = (caregiverId: string, caregiverName: string, date: string, time: string) => {
    setSelectedSlot({ caregiverId, caregiverName, date, time });
    setShowAssignModal(true);
  };

  const handleCreateVisit = (visitData: any) => {
    console.log('Creating visit:', visitData);
    // In a real app, this would make an API call
    refreshData();
    setShowAssignModal(false);
    setSelectedSlot(null);
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
        />
        
        <div className="flex flex-1 gap-4 overflow-hidden">
          <div className="flex-1">
            <WeekViewScheduler
              caregivers={caregivers}
              scheduledVisits={scheduledVisits}
              selectedWeek={selectedWeek}
              onVisitMove={moveVisit}
              onVisitSelect={handleVisitSelect}
              onVisitAssign={handleVisitAssignFromCalendar}
              onSlotClick={handleSlotClick}
            />
          </div>
          
          <UnassignedVisitsSidebar
            visits={unassignedVisits}
            onVisitSelect={handleVisitSelect}
          />
        </div>
      </div>

      <CaregiverSuggestionsModal
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        visit={selectedVisit}
        onAssign={handleAssignVisit}
      />

      <AssignVisitModal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedSlot(null);
        }}
        selectedSlot={selectedSlot}
        onCreateVisit={handleCreateVisit}
      />
    </Layout>
  );
};

export default AdminScheduler;
