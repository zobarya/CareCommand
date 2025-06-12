
import { useState } from 'react';
import { Caregiver, Patient, PatientForDialog } from '@/types/admin';

export const useCaregiverManagement = (caregivers: Caregiver[]) => {
  const [isAddCaregiverOpen, setIsAddCaregiverOpen] = useState(false);
  const [isEditCaregiverOpen, setIsEditCaregiverOpen] = useState(false);
  const [isDetailsCaregiverOpen, setIsDetailsCaregiverOpen] = useState(false);
  const [isPatientDetailsOpen, setIsPatientDetailsOpen] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<PatientForDialog | null>(null);

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

  const handlePatientClick = (patient: Patient) => {
    const caregiver = caregivers.find(c => 
      c.patientsList.some(p => p.id === patient.id)
    );
    
    const patientForDialog: PatientForDialog = {
      id: patient.id,
      name: patient.name,
      age: patient.age,
      carePlan: patient.carePlan,
      status: patient.status,
      caregiver: caregiver?.name || 'Unknown',
      nextVisit: patient.nextVisit
    };
    setSelectedPatient(patientForDialog);
    setIsPatientDetailsOpen(true);
  };

  return {
    // State
    isAddCaregiverOpen,
    isEditCaregiverOpen,
    isDetailsCaregiverOpen,
    isPatientDetailsOpen,
    selectedCaregiver,
    selectedPatient,
    
    // Setters
    setIsAddCaregiverOpen,
    setIsEditCaregiverOpen,
    setIsDetailsCaregiverOpen,
    setIsPatientDetailsOpen,
    
    // Handlers
    handleCaregiverClick,
    handleEditCaregiver,
    handlePatientClick,
  };
};
