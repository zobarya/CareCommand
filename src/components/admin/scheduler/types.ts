
export interface Caregiver {
  id: string;
  name: string;
  role: string;
  region: string;
  assignedHours: number;
  maxHours: number;
  specializations: string[];
}

export interface Visit {
  id: string;
  caregiverId: string;
  patientName: string;
  serviceType: string;
  date: string;
  startTime: string;
  duration: number;
  status: string;
  notes?: string;
}

export interface VirtualizedWeekSchedulerProps {
  caregivers: Caregiver[];
  scheduledVisits: Visit[];
  selectedWeek: Date;
  onVisitMove: (visitId: string, newCaregiverId: string, newDate: string, newTimeSlot: string) => void;
  onVisitSelect: (visit: Visit) => void;
  onVisitAssign: (visitData: any) => void;
  onSlotClick: (caregiverId: string, caregiverName: string, date: string, time: string) => void;
}

export interface SchedulerGridProps {
  caregivers: Caregiver[];
  scheduledVisits: Visit[];
  selectedWeek: Date;
  searchTerm: string;
  regionFilter: string;
  roleFilter: string;
  groupByRegion: boolean;
  onSlotClick: (caregiverId: string, caregiverName: string, date: string, time: string) => void;
  onVisitClick: (visit: Visit) => void;
  onVisitDrop: (visitId: string, caregiverId: string, date: string, time: string) => void;
}

export interface TimeSlotCellProps {
  caregiverId: string;
  caregiverName: string;
  day: Date;
  time: string;
  visits: Visit[];
  isDragOver: boolean;
  onSlotClick: (caregiverId: string, caregiverName: string, date: string, time: string) => void;
  onVisitClick: (visit: Visit) => void;
  onDragOver: (e: React.DragEvent, slotId: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, caregiverId: string, date: string, time: string) => void;
}

export interface SchedulerWeekHeaderProps {
  weekDays: Date[];
}

export interface CaregiverRowProps {
  caregiver: Caregiver;
  weekDays: Date[];
  timeSlots: string[]; // Keep for backward compatibility, but not used
  visits: Visit[];
  dragOverSlot: string | null;
  onSlotClick: (caregiverId: string, caregiverName: string, date: string, time: string) => void;
  onVisitClick: (visit: Visit) => void;
  onDragOver: (e: React.DragEvent, slotId: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, caregiverId: string, date: string, time: string) => void;
}

export interface SchedulerRowProps {
  item: any;
  index: number;
  style: React.CSSProperties;
  weekDays: Date[];
  timeSlots: string[];
  scheduledVisits: any[];
  caregivers: any[];
  expandedRegions: Set<string>;
  collapsedCaregivers: Set<string>;
  onToggleRegion: (region: string) => void;
  onToggleCaregiverCollapse: (caregiverId: string) => void;
  onSlotClick: (caregiverId: string, caregiverName: string, date: Date, time: string) => void;
  onVisitClick: (visit: any) => void;
}

export interface SchedulerTimeSlotProps {
  caregiverId: string;
  caregiverName: string;
  day: Date;
  time: string;
  visits: any[];
  onSlotClick: (caregiverId: string, caregiverName: string, date: Date, time: string) => void;
  onVisitClick: (visit: any) => void;
}

export interface SchedulerHeaderProps {
  searchTerm: string;
  regionFilter: string;
  roleFilter: string;
  groupByRegion: boolean;
  regions: string[];
  roles: string[];
  caregiverCount: number;
  onSearchChange: (value: string) => void;
  onRegionFilterChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onGroupByRegionToggle: () => void;
}
