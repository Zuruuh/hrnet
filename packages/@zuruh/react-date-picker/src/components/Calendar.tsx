import { type ReactNode, type FC, useMemo } from 'react';
import day from 'dayjs';
import { useDatePickerContext } from '../context/DatePickerContext';
import { WeekContext } from '../context/WeekContext';

export interface CalendarInnerProps {
  weekNumber: number;
}

export interface CalendarProps {
  children: ReactNode | ((props: CalendarInnerProps) => ReactNode);
}

export const Calendar: FC<CalendarProps> = ({ children }) => {
  const { selectedDate } = useDatePickerContext();
  const date = useMemo(
    () => (selectedDate ?? day()).set('date', 1),
    [selectedDate]
  );

  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => {
        const weekDate = date.add(i, 'weeks');
        const weekNumber = weekDate.week();

        return (
          <WeekContext.Provider key={i} value={{ weekNumber }}>
            {typeof children === 'function'
              ? children({ weekNumber })
              : children}
          </WeekContext.Provider>
        );
      })}
    </>
  );
};
