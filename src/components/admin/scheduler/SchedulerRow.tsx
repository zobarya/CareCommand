
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
  const workload = getCaregiverWorkload(caregiver.id);
  
  return (
    <div style={style} className="hover:bg-muted/10 transition-colors group border-b border-border/30 bg-background/50">
      <div className="grid grid-cols-8 h-full min-h-[180px]">
        {/* Enhanced Caregiver Info Column */}
        <div className="p-6 border-r border-border/50 bg-card flex items-center justify-center relative">
          <div className="text-center w-full">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-3 shadow-sm">
              <span className="text-lg font-bold text-primary">
                {caregiver.name ? caregiver.name.split(' ').map((n: string) => n[0]).join('') : '??'}
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground leading-tight">
                {caregiver.name || 'Unknown Caregiver'}
              </h3>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs font-medium">
                  {caregiver.role || 'Unknown Role'}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {caregiver.region || 'Unknown Region'}
                </div>
              </div>
              <div className="mt-3 p-2 bg-muted/30 rounded-md">
                <div className="text-xs text-muted-foreground mb-1">Workload</div>
                <Badge variant={workload.assignedHours > workload.maxHours ? "destructive" : "secondary"} className="text-xs">
                  {workload.assignedHours}/{workload.maxHours} hrs
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Time Slots Grid */}
        {weekDays.map((day, dayIndex) => (
          <div key={day.toISOString()} className={`border-r border-border/30 last:border-r-0 hover:bg-muted/5 transition-colors ${dayIndex % 2 === 0 ? 'bg-muted/5' : 'bg-background'}`}>
            <div className="p-3 h-full">
              <div className="grid gap-2 h-full">
                {timeSlots.map((time, timeIndex) => {
                  const visits = getVisitsForSlot(caregiver.id, day, time);
                  
                  return (
                    <div key={time} className="relative">
                      <SchedulerTimeSlot
                        caregiverId={caregiver.id}
                        caregiverName={caregiver.name}
                        day={day}
                        time={time}
                        visits={visits}
                        onSlotClick={onSlotClick}
                        onVisitClick={onVisitClick}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulerRow;
