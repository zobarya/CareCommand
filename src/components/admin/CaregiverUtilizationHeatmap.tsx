
import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import HeatmapCell from './HeatmapCell';

interface Caregiver {
  id: string;
  name: string;
  role: string;
  region: string;
  maxHours: number;
  weeklyUtilization: {
    [date: string]: {
      hours: number;
      visits: number;
      patients: number;
    };
  };
}

interface CaregiverUtilizationHeatmapProps {
  caregivers: Caregiver[];
  weekStartDate: Date;
}

const CaregiverUtilizationHeatmap: React.FC<CaregiverUtilizationHeatmapProps> = ({
  caregivers,
  weekStartDate,
}) => {
  const weekDays = Array.from({ length: 7 }, (_, i) => 
    addDays(startOfWeek(weekStartDate, { weekStartsOn: 1 }), i)
  );

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-semibold w-48 sticky left-0 bg-muted/30 border-r">
                Caregiver
              </th>
              {dayNames.map((day, index) => (
                <th key={day} className="text-center p-4 font-semibold w-24">
                  <div>{day}</div>
                  <div className="text-xs text-muted-foreground font-normal">
                    {format(weekDays[index], 'MMM d')}
                  </div>
                </th>
              ))}
              <th className="text-center p-4 font-semibold w-32">
                Weekly Total
              </th>
            </tr>
          </thead>
          <tbody>
            {caregivers.map((caregiver) => {
              const weeklyTotal = weekDays.reduce((total, day) => {
                const dateKey = format(day, 'yyyy-MM-dd');
                const dayData = caregiver.weeklyUtilization[dateKey];
                return total + (dayData?.hours || 0);
              }, 0);

              const weeklyUtilizationPercent = caregiver.maxHours > 0 
                ? Math.round((weeklyTotal / caregiver.maxHours) * 100)
                : 0;

              const isOverbooked = weeklyUtilizationPercent > 100;

              return (
                <tr key={caregiver.id} className="border-b hover:bg-muted/20">
                  <td className="p-4 sticky left-0 bg-background border-r">
                    <div className="font-medium">{caregiver.name}</div>
                    <div className="text-sm text-muted-foreground">{caregiver.role}</div>
                    <div className="text-xs text-muted-foreground">{caregiver.region}</div>
                  </td>
                  {weekDays.map((day) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const dayData = caregiver.weeklyUtilization[dateKey] || {
                      hours: 0,
                      visits: 0,
                      patients: 0,
                    };
                    const dailyMaxHours = caregiver.maxHours / 5; // Assuming 5 working days

                    return (
                      <td key={dateKey} className="p-2">
                        <HeatmapCell
                          hours={dayData.hours}
                          maxHours={dailyMaxHours}
                          visits={dayData.visits}
                          patients={dayData.patients}
                          date={format(day, 'MMM d')}
                        />
                      </td>
                    );
                  })}
                  <td className="p-4 text-center">
                    <div className={`font-semibold ${isOverbooked ? 'text-red-600' : ''}`}>
                      {weeklyTotal.toFixed(1)}/{caregiver.maxHours} hrs
                    </div>
                    <div className={`text-sm ${isOverbooked ? 'text-red-600' : 'text-muted-foreground'}`}>
                      {weeklyUtilizationPercent}%
                      {isOverbooked && ' ⚠️'}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaregiverUtilizationHeatmap;
