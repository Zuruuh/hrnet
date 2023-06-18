import { forwardRef, useState, type ReactNode } from 'react';
import type { DivPropsWithoutRef } from 'react-html-props';
import { DatePickerContext } from './context/DatePickerContext';
import { Calendar } from './components/Calendar';
import { Days } from './components/Days';
import { Setter } from './types/setter';

export interface DatePickerProps extends DivPropsWithoutRef {
  selectedDate: Date | null;
  setSelectedDate: Setter<Date | null>;
  children: ReactNode;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker({ children }, ref) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    return (
      <DatePickerContext.Provider
        value={{ selectedDate, setSelectedDate, initialized: true }}
      >
        <div data-testid="date-picker" ref={ref}>
          {children}
        </div>
      </DatePickerContext.Provider>
    );
  }
);

export default {
  Root: DatePicker,
  Calendar,
  Days,
};
