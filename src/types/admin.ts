
export interface Patient {
  id: string;
  name: string;
  age: number;
  carePlan: string;
  status: string;
  nextVisit: string;
  contactInfo: string;
}

export interface PatientForDialog {
  id: string;
  name: string;
  age: number;
  carePlan: string;
  status: string;
  caregiver: string;
  nextVisit: string;
}

export interface Caregiver {
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
  patientsList: Patient[];
  weeklyUtilization?: {
    [date: string]: {
      hours: number;
      visits: number;
      patients: number;
    };
  };
}
