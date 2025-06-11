
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SchedulerFilters from '@/components/admin/scheduler/SchedulerFilters';
import VirtualizedWeekScheduler from '@/components/admin/scheduler/VirtualizedWeekScheduler';
import UnassignedVisitsSidebar from '@/components/admin/scheduler/UnassignedVisitsSidebar';
import CaregiverSuggestionsModal from '@/components/admin/scheduler/CaregiverSuggestionsModal';
import AssignVisitModal from '@/components/admin/scheduler/AssignVisitModal';
import { useSchedulerData } from '@/hooks/useSchedulerData';

const AdminScheduler: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [groupByRegion, setGroupByRegion] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddVisitModal, setShowAddVisitModal] = useState(false);
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
    addUnassignedVisit,
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
    console.log('Adding visit from calendar click:', visitData);
    refreshData();
  };

  const handleSlotClick = (caregiverId: string, caregiverName: string, date: string, time: string) => {
    setSelectedSlot({ caregiverId, caregiverName, date, time });
    setShowAssignModal(true);
  };

  const handleCreateVisit = (visitData: any) => {
    console.log('Creating visit:', visitData);
    if (selectedSlot) {
      // If created from a specific slot, assign it immediately
      const newVisit = {
        ...visitData,
        caregiverId: selectedSlot.caregiverId,
        date: selectedSlot.date,
        startTime: selectedSlot.time,
      };
      // In real app, this would make an API call
      refreshData();
    } else {
      // If created from add button, add to unassigned
      addUnassignedVisit(visitData);
    }
    setShowAssignModal(false);
    setShowAddVisitModal(false);
    setSelectedSlot(null);
  };

  const handleAddVisit = () => {
    setSelectedSlot(null);
    setShowAddVisitModal(true);
  };

  return (
    <Layout title="Enhanced Scheduler" role="admin">
      <div className="flex flex-col h-full">
        <SchedulerFilters
          selectedWeek={selectedWeek}
          selectedRegion={selectedRegion}
          selectedSpecialization={selectedSpecialization}
          searchTerm={searchTerm}
          groupByRegion={groupByRegion}
          onWeekChange={setSelectedWeek}
          onRegionChange={setSelectedRegion}
          onSpecializationChange={setSelectedSpecialization}
          onSearchChange={setSearchTerm}
          onGroupByRegionToggle={() => setGroupByRegion(!groupByRegion)}
          onRefresh={refreshData}
        />
        
        <div className="flex flex-1 gap-4 overflow-hidden">
          <div className="flex-1">
            <VirtualizedWeekScheduler
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
            onAddVisit={handleAddVisit}
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
        open={showAssignModal || showAddVisitModal}
        onOpenChange={(open) => {
          setShowAssignModal(open);
          setShowAddVisitModal(open);
          if (!open) setSelectedSlot(null);
        }}
        preFilledData={{
          caregiverId: selectedSlot?.caregiverId || '',
          caregiverName: selectedSlot?.caregiverName || '',
          date: selectedSlot?.date || '',
          startTime: selectedSlot?.time || ''
        }}
        onAssign={handleCreateVisit}
      />
    </Layout>
  );
};

export default AdminScheduler;
