
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateRangePickerProps {
  dateRange: {
    start: Date;
    end: Date;
  };
  onUpdate: (range: { start: Date; end: Date }) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, onUpdate }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range) return;

    if (range.from && range.to) {
      onUpdate({ start: range.from, end: range.to });
      // Don't close immediately for range selection - let user see their selection
      setTimeout(() => setIsCalendarOpen(false), 100);
    } else if (range.from) {
      onUpdate({ start: range.from, end: range.from });
    }
  };

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="min-w-[250px] justify-start">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange.start && dateRange.end ? (
            <>
              <span className="whitespace-nowrap">
                {format(dateRange.start, 'MMM d, yyyy')} - {format(dateRange.end, 'MMM d, yyyy')}
              </span>
            </>
          ) : (
            <span>Select date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{
            from: dateRange.start,
            to: dateRange.end,
          }}
          onSelect={handleSelect}
          numberOfMonths={1}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
