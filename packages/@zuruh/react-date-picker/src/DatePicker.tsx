import { forwardRef, useState, type ReactNode } from 'react';
import type { DivPropsWithoutRef } from 'react-html-props';
import { DatePickerContext } from './context/DatePickerContext';
import { Calendar } from './components/Calendar';
import { Setter } from './types/setter';
import { Week } from './components/Week';
import { Day } from './components/Day';
import day, { type Dayjs } from 'dayjs';

export interface DatePickerProps extends DivPropsWithoutRef {
  selectedDate: Dayjs | null;
  setSelectedDate: Setter<Dayjs | null>;
  children: ReactNode;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker({ children }, ref) {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [temporarySelectedMonth, setTemporarySelectedMonth] = useState(
      day().month()
    );
    const [temporarySelectedYear, setTemporarySelectedYear] = useState(
      day().year()
    );

    return (
      <DatePickerContext.Provider
        value={{
          selectedDate,
          setSelectedDate,
          temporarySelectedMonth,
          setTemporarySelectedMonth,
          temporarySelectedYear,
          setTemporarySelectedYear,
        }}
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
  Week,
  Day,
};
