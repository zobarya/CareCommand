
import React from 'react';
import { parseISO, isSameDay } from 'date-fns';
import { 
  ChevronDown, 
  ChevronRight, 
  Users
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SchedulerRowProps } from './types';
import SchedulerTimeSlot from './SchedulerTimeSlot';

const SchedulerRow: React.FC<SchedulerRowProps> = ({
  item,
  index,
  style,
  weekDays,
  timeSlots,
  scheduledVisits,
  caregivers,
  expandedRegions,
  collapsedCaregivers,
  onToggleRegion,
  onToggleCaregiverCollapse,
  onSlotClick,
  onVisitClick,
}) => {
  const getVisitsForSlot = (caregiverId: string, date: Date, time: string) => {
    return scheduledVisits.filter(visit => {
      const visitDate = parseISO(visit.date);
      return visit.caregiverId === caregiverId &&
             isSameDay(visitDate, date) &&
             visit.startTime === time;
    });
  };

  const getCaregiverWorkload = (caregiverId: string) => {
    const caregiverVisits = scheduledVisits.filter(visit => visit.caregiverId === caregiverId);
    const assignedHours = caregiverVisits.reduce((total, visit) => total + (visit.duration || 60) / 60, 0);
    const caregiver = caregivers.find(c => c.id === caregiverId);
    const maxHours = caregiver?.maxHours || 40;
    return { assignedHours: Math.round(assignedHours), maxHours };
  };

  if (item.type === 'region') {
    return (
      <div style={style} className="border-b bg-muted/30 shadow-sm">
        <button
          onClick={() => onToggleRegion(item.region)}
          className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors rounded-lg mx-2 my-1"
        >
          {expandedRegions.has(item.region) ? (
            <ChevronDown className="w-4 h-4 text-primary" />
          ) : (
            <ChevronRight className="w-4 h-4 text-primary" />
          )}
          <Users className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground">{item.region} Region</span>
          <Badge variant="secondary" className="ml-auto">
            {item.count} caregivers
          </Badge>
        </button>
      </div>
    );
  }

  if (!item.caregiver) {
    return <div style={style} className="p-4 text-red-500">Error: No caregiver data</div>;
  }

  const { caregiver } = item;
  
  const hasVisits = scheduledVisits.some(visit => visit.caregiverId === caregiver.id);
  const workload = getCaregiverWorkload(caregiver.id);
  
  return (
    <div style={style} className="hover:bg-muted/20 transition-colors group border-b border-border/50">
      <div className="grid grid-cols-8 min-h-[120px]">
        {/* Caregiver Info Column */}
        <div className="p-4 border-r bg-background flex flex-col justify-center relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-primary">
                {caregiver.name ? caregiver.name.split(' ').map((n: string) => n[0]).join('') : '??'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-base text-foreground mb-1 break-words">
                {caregiver.name || 'Unknown Caregiver'}
              </div>
              <div className="text-sm text-muted-foreground mb-2 break-words">
                {caregiver.role || 'Unknown Role'} • {caregiver.region || 'Unknown Region'}
              </div>
              <Badge variant="outline" className="text-xs">
                {workload.assignedHours}/{workload.maxHours} hrs
              </Badge>
            </div>
            {!hasVisits && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleCaregiverCollapse(caregiver.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
              >
                <ChevronDown className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Time Slots Columns */}
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="border-r last:border-r-0 hover:bg-muted/10 transition-colors">
            <div className="p-2 space-y-2">
              {timeSlots.map((time) => {
                const visits = getVisitsForSlot(caregiver.id, day, time);
                
                return (
                  <SchedulerTimeSlot
                    key={time}
                    caregiverId={caregiver.id}
                    caregiverName={caregiver.name}
                    day={day}
                    time={time}
                    visits={visits}
                    onSlotClick={onSlotClick}
                    onVisitClick={onVisitClick}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulerRow;
