import { forwardRef, useState, type ReactNode } from 'react';
import { DatePickerContext } from './context/DatePickerContext';

export interface DatePickerProps {
  open: boolean;
  children: ReactNode;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker({ children }, ref) {
    const [selectedDate] = useState<Date | null>(null);

    return (
      <DatePickerContext.Provider value={{ selectedDate }}>
        <div data-testid="date-picker" ref={ref}>
          {children}
        </div>
      </DatePickerContext.Provider>
    );
  }
);

// DatePicker.Calendar = Calendar;
