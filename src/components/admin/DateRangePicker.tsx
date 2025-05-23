
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
  const [selectedRange, setSelectedRange] = useState<{ start: Date; end: Date }>(dateRange);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    const newRange = !selectedRange.start || (selectedRange.start && selectedRange.end) ? 
      { start: date, end: date } :
      { start: selectedRange.start, end: date };

    // Make sure end date is after start date
    if (newRange.end < newRange.start) {
      newRange.end = newRange.start;
    }

    setSelectedRange(newRange);
    
    if (newRange.start && newRange.end) {
      onUpdate(newRange);
      if (newRange.end !== newRange.start) {
        // Close the calendar if a range is selected
        setTimeout(() => setIsCalendarOpen(false), 300);
      }
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
            from: selectedRange.start,
            to: selectedRange.end,
          }}
          onSelect={(range) => {
            if (range) {
              handleSelect(range.from);
              handleSelect(range.to);
            }
          }}
          numberOfMonths={1}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
        <div className="p-3 border-t border-border">
          <Button
            size="sm"
            className="w-full"
            onClick={() => {
              onUpdate(selectedRange);
              setIsCalendarOpen(false);
            }}
          >
            Apply Range
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
