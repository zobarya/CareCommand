
export interface VirtualizedWeekSchedulerProps {
  caregivers: any[];
  scheduledVisits: any[];
  selectedWeek: Date;
  onVisitMove: (visitId: string, newCaregiverId: string, newTimeSlot: string) => void;
  onVisitSelect: (visit: any) => void;
  onVisitAssign: (visitData: any) => void;
  onSlotClick: (caregiverId: string, caregiverName: string, date: string, time: string) => void;
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

export interface SchedulerWeekHeaderProps {
  weekDays: Date[];
  caregiverCount: number;
}
