
import React, { useState } from 'react';
import { format, addDays, startOfWeek, parseISO, isSameDay } from 'date-fns';
import { Clock, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import CaregiverGroupHeader from './CaregiverGroupHeader';

interface Caregiver {
  id: string;
  name: string;
  role: string;
  region: string;
  assignedHours: number;
  maxHours: number;
  specializations: string[];
}

interface Visit {
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

interface SchedulerGridProps {
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

const SchedulerGrid: React.FC<SchedulerGridProps> = ({
  caregivers,
  scheduledVisits,
  selectedWeek,
  searchTerm,
  regionFilter,
  roleFilter,
  groupByRegion,
  onSlotClick,
  onVisitClick,
  onVisitDrop,
}) => {
  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set(['North', 'Central', 'South', 'East']));
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);

  // Filter caregivers based on search and filters
  const filteredCaregivers = caregivers.filter(caregiver => {
    const matchesSearch = caregiver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'all' || caregiver.region.toLowerCase() === regionFilter.toLowerCase();
    const matchesRole = roleFilter === 'all' || caregiver.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRegion && matchesRole;
  });

  // Group caregivers by region if needed
  const caregiverGroups: Record<string, Caregiver[]> = groupByRegion 
    ? filteredCaregivers.reduce((groups, caregiver) => {
        const region = caregiver.region;
        if (!groups[region]) groups[region] = [];
        groups[region].push(caregiver);
        return groups;
      }, {} as Record<string, Caregiver[]>)
    : { 'All': filteredCaregivers };

  const getVisitsForSlot = (caregiverId: string, date: Date, time: string) => {
    return scheduledVisits.filter(visit => {
      const visitDate = parseISO(visit.date);
      return visit.caregiverId === caregiverId &&
             isSameDay(visitDate, date) &&
             visit.startTime === time;
    });
  };

  const handleDragOver = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    setDragOverSlot(slotId);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e: React.DragEvent, caregiverId: string, date: Date, time: string) => {
    e.preventDefault();
    setDragOverSlot(null);
    
    const visitId = e.dataTransfer.getData('text/plain');
    if (visitId) {
      onVisitDrop(visitId, caregiverId, date.toISOString().split('T')[0], time);
    }
  };

  const toggleRegion = (region: string) => {
    const newExpanded = new Set(expandedRegions);
    if (newExpanded.has(region)) {
      newExpanded.delete(region);
    } else {
      newExpanded.add(region);
    }
    setExpandedRegions(newExpanded);
  };

  const TimeSlotCell = ({ caregiverId, caregiverName, day, time, visits }: {
    caregiverId: string;
    caregiverName: string;
    day: Date;
    time: string;
    visits: Visit[];
  }) => {
    const slotId = `${caregiverId}-${day.toISOString().split('T')[0]}-${time}`;
    const isDragOver = dragOverSlot === slotId;

    const handleClick = () => {
      if (visits.length > 0) {
        onVisitClick(visits[0]);
      } else {
        onSlotClick(caregiverId, caregiverName, day.toISOString().split('T')[0], time);
      }
    };

    return (
      <div
        className={`h-14 border border-border/50 cursor-pointer transition-all duration-200 flex items-center justify-center p-1 ${
          visits.length > 0
            ? 'bg-primary/10 hover:bg-primary/20 border-primary/30'
            : isDragOver
            ? 'bg-primary/20 border-primary/50'
            : 'hover:bg-muted/40 hover:border-primary/30'
        }`}
        onClick={handleClick}
        onDragOver={(e) => handleDragOver(e, slotId)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, caregiverId, day, time)}
      >
        {visits.length > 0 ? (
          <div className="w-full text-center">
            {visits.map((visit) => (
              <div key={visit.id} className="bg-background/90 rounded p-1">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <User className="w-3 h-3 text-primary" />
                  <span className="font-medium text-xs truncate">{visit.patientName}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {visit.serviceType}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground/60 text-xs text-center">
            <Clock className="w-3 h-3 mx-auto mb-1" />
            <span>{time}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Caregiver Schedule - Week of {format(weekStart, 'MMM d, yyyy')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="min-w-[1200px]">
            {/* Header with days */}
            <div className="sticky top-0 z-20 bg-background">
              <div className="grid grid-cols-8 border-b-2 border-border bg-muted/30">
                <div className="p-4 border-r border-border font-semibold bg-card">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Caregivers / Time
                  </div>
                </div>
                {weekDays.map((day) => (
                  <div key={day.toISOString()} className="p-4 border-r border-border last:border-r-0 text-center bg-muted/20">
                    <div className="font-semibold">{format(day, 'EEE')}</div>
                    <div className="text-sm text-muted-foreground">{format(day, 'MMM d')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Caregiver sections */}
            {Object.entries(caregiverGroups).map(([regionName, regionCaregivers]: [string, Caregiver[]]) => (
              <div key={regionName}>
                {groupByRegion && (
                  <CaregiverGroupHeader
                    region={regionName}
                    caregiverCount={regionCaregivers.length}
                    isExpanded={expandedRegions.has(regionName)}
                    onToggle={() => toggleRegion(regionName)}
                  />
                )}
                
                {(!groupByRegion || expandedRegions.has(regionName)) && 
                  regionCaregivers.map((caregiver) => (
                    <div key={caregiver.id} className="border-b-2 border-border">
                      {/* Caregiver header row */}
                      <div className="grid grid-cols-8 bg-card border-b border-border/50">
                        <div className="p-3 border-r border-border bg-muted/10">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-xs font-bold text-primary">
                                {caregiver.name.split(' ').map((n: string) => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-sm">{caregiver.name}</div>
                              <div className="text-xs text-muted-foreground">{caregiver.role} - {caregiver.region}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-7 p-3 flex items-center">
                          <div className="text-sm text-muted-foreground">
                            Workload: {caregiver.assignedHours}/{caregiver.maxHours} hrs
                          </div>
                        </div>
                      </div>

                      {/* Time slots for this caregiver */}
                      {timeSlots.map((time) => (
                        <div key={`${caregiver.id}-${time}`} className="grid grid-cols-8 border-b border-border/30">
                          {/* Time column */}
                          <div className="p-2 border-r border-border bg-muted/5 flex items-center justify-center">
                            <span className="text-sm font-medium">{time}</span>
                          </div>
                          
                          {/* Day columns */}
                          {weekDays.map((day) => {
                            const visits = getVisitsForSlot(caregiver.id, day, time);
                            return (
                              <TimeSlotCell
                                key={`${caregiver.id}-${day.toISOString()}-${time}`}
                                caregiverId={caregiver.id}
                                caregiverName={caregiver.name}
                                day={day}
                                time={time}
                                visits={visits}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SchedulerGrid;
