
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SchedulerFilters from '@/components/admin/scheduler/SchedulerFilters';
import VirtualizedWeekScheduler from '@/components/admin/scheduler/VirtualizedWeekScheduler';
import UnassignedVisitsSidebar from '@/components/admin/scheduler/UnassignedVisitsSidebar';
import CaregiverSuggestionsModal from '@/components/admin/scheduler/CaregiverSuggestionsModal';
import AssignVisitModal from '@/components/admin/scheduler/AssignVisitModal';
import { useSchedulerData } from '@/hooks/useSchedulerData';
import { useToast } from '@/hooks/use-toast';

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

  const { toast } = useToast();

  const {
    caregivers,
    scheduledVisits,
    unassignedVisits,
    assignVisit,
    moveVisit,
    addUnassignedVisit,
    addScheduledVisit,
    refreshData
  } = useSchedulerData(selectedWeek, selectedRegion, selectedSpecialization);

  const handleAssignVisit = (visitId: string, caregiverId: string, timeSlot: string) => {
    console.log('AdminScheduler: Assigning visit', { visitId, caregiverId, timeSlot });
    assignVisit(visitId, caregiverId, timeSlot);
    setShowSuggestions(false);
    setSelectedVisit(null);
    toast({
      title: "Visit Assigned Successfully",
      description: "The visit has been assigned to the caregiver.",
    });
  };

  const handleVisitSelect = (visit: any) => {
    console.log('AdminScheduler: Visit selected', visit);
    setSelectedVisit(visit);
    setShowSuggestions(true);
  };

  const handleVisitAssignFromCalendar = (visitData: any) => {
    console.log('AdminScheduler: Adding visit from calendar click:', visitData);
    refreshData();
  };

  const handleSlotClick = (caregiverId: string, caregiverName: string, date: string, time: string) => {
    console.log('AdminScheduler: Slot clicked', { caregiverId, caregiverName, date, time });
    setSelectedSlot({ caregiverId, caregiverName, date, time });
    setShowAssignModal(true);
  };

  const handleCreateVisit = (visitData: any) => {
    console.log('AdminScheduler: Creating visit:', visitData);
    
    if (selectedSlot) {
      // If created from a specific slot, assign it immediately
      const newVisit = {
        caregiverId: selectedSlot.caregiverId,
        patientName: visitData.patientName,
        serviceType: visitData.serviceType,
        date: selectedSlot.date,
        startTime: selectedSlot.time,
        duration: parseInt(visitData.duration) || 60,
        notes: visitData.notes || ''
      };
      
      console.log('AdminScheduler: Adding scheduled visit:', newVisit);
      addScheduledVisit(newVisit);
      
      toast({
        title: "Visit Created & Assigned",
        description: `Visit scheduled for ${selectedSlot.caregiverName} on ${selectedSlot.date} at ${selectedSlot.time}`,
      });
    } else {
      // If created from add button, add to unassigned
      const newVisit = {
        patientName: visitData.patientName,
        serviceType: visitData.serviceType,
        date: visitData.date,
        startTime: visitData.startTime || '09:00',
        duration: parseInt(visitData.duration) || 60,
        notes: visitData.notes || '',
        priority: visitData.priority || 'medium'
      };
      
      console.log('AdminScheduler: Adding unassigned visit:', newVisit);
      addUnassignedVisit(newVisit);
      
      toast({
        title: "Visit Created",
        description: "Visit added to unassigned list. Drag to schedule or use suggestions.",
      });
    }
    
    setShowAssignModal(false);
    setShowAddVisitModal(false);
    setSelectedSlot(null);
  };

  const handleAddVisit = () => {
    console.log('AdminScheduler: Add visit button clicked');
    setSelectedSlot(null);
    setShowAddVisitModal(true);
  };

  const handleMoveVisit = (visitId: string, newCaregiverId: string, newTimeSlot: string) => {
    console.log('AdminScheduler: Moving visit', { visitId, newCaregiverId, newTimeSlot });
    moveVisit(visitId, newCaregiverId, newTimeSlot);
    toast({
      title: "Visit Moved",
      description: "Visit has been successfully moved to the new time slot.",
    });
  };

  // Filter caregivers based on current filters
  const filteredCaregivers = caregivers.filter(caregiver => {
    const matchesSearch = searchTerm === '' || 
      caregiver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || 
      caregiver.region.toLowerCase() === selectedRegion.toLowerCase();
    const matchesSpecialization = selectedSpecialization === 'all' || 
      caregiver.role.toLowerCase().includes(selectedSpecialization.toLowerCase());
    
    return matchesSearch && matchesRegion && matchesSpecialization;
  });

  console.log('AdminScheduler: Current state', {
    scheduledVisits: scheduledVisits.length,
    unassignedVisits: unassignedVisits.length,
    filteredCaregivers: filteredCaregivers.length
  });

  return (
    <Layout title="Enhanced Scheduler" role="admin">
      <div className="flex flex-col h-screen">
        <div className="flex-shrink-0">
          <SchedulerFilters
            selectedWeek={selectedWeek}
            selectedRegion={selectedRegion}
            selectedSpecialization={selectedSpecialization}
            searchTerm={searchTerm}
            groupByRegion={groupByRegion}
            caregiverCount={filteredCaregivers.length}
            onWeekChange={setSelectedWeek}
            onRegionChange={setSelectedRegion}
            onSpecializationChange={setSelectedSpecialization}
            onSearchChange={setSearchTerm}
            onGroupByRegionToggle={() => setGroupByRegion(!groupByRegion)}
            onRefresh={refreshData}
          />
        </div>
        
        <div className="flex flex-1 gap-4 overflow-hidden min-h-0">
          <div className="flex-1 min-h-0">
            <VirtualizedWeekScheduler
              caregivers={filteredCaregivers}
              scheduledVisits={scheduledVisits}
              selectedWeek={selectedWeek}
              searchTerm={searchTerm}
              regionFilter={selectedRegion}
              roleFilter={selectedSpecialization}
              groupByRegion={groupByRegion}
              onVisitMove={handleMoveVisit}
              onVisitSelect={handleVisitSelect}
              onVisitAssign={handleVisitAssignFromCalendar}
              onSlotClick={handleSlotClick}
            />
          </div>
          
          <div className="flex-shrink-0">
            <UnassignedVisitsSidebar
              visits={unassignedVisits}
              onVisitSelect={handleVisitSelect}
              onAddVisit={handleAddVisit}
            />
          </div>
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
