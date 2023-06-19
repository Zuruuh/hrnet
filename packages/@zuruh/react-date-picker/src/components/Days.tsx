import { type ReactNode, forwardRef, useCallback, useMemo } from 'react';
import { useDatePickerContext } from '../hooks/useDatePickerContext';
import day, { type Dayjs } from 'dayjs';

export interface DaysInnerProps {
  onClick(): void;
  isCurrentDate: boolean;
  isSelectionnedDate: boolean;
  belongsToSelectedMonth: boolean;
  date: Dayjs;
}

export interface DaysProps {
  children: (props: DaysInnerProps) => ReactNode;
}

const MONDAY = 1;
const DAYS_COUNT_IN_A_WEEK = 7;

export const Days = forwardRef<HTMLDivElement, DaysProps>(function Days(
  { children },
  ref
) {
  const {
    selectedDate,
    setSelectedDate,
    temporarySelectedYear,
    temporarySelectedMonth,
  } = useDatePickerContext();
  const onClick = useCallback(
    (date: Dayjs) => {
      setSelectedDate(date);
    },
    [setSelectedDate]
  );

  const month = useMemo(
    () =>
      day()
        .set('date', 1)
        .set('month', temporarySelectedMonth)
        .set('year', temporarySelectedYear),
    [temporarySelectedYear, temporarySelectedMonth]
  );
  const calendar: DaysInnerProps[] = useMemo(() => {
    const days: DaysInnerProps[] = [];
    const countOfDaysBeforeMonthStart = -(MONDAY - month.day());
    const monthBefore = month.subtract(1, 'month').endOf('month');

    for (let i = 0; i < countOfDaysBeforeMonthStart; i++) {
      const date = monthBefore.subtract(i, 'days');

      days.unshift({
        date,
        belongsToSelectedMonth: false,
        onClick: () => console.log(date.toString()),
        isCurrentDate: date.isSame(day(), 'date'),
        isSelectionnedDate: date.isSame(selectedDate, 'date'),
      });
    }

    for (let i = 1; i <= month.daysInMonth(); i++) {
      const date = month.set('date', i);
      days.push({
        date,
        belongsToSelectedMonth: true,
        onClick: () => console.log(date.toString()),
        isCurrentDate: date.isSame(day(), 'date'),
        isSelectionnedDate: date.isSame(selectedDate, 'date'),
      });
    }

    const countOfDaysAfterMonthEnd = DAYS_COUNT_IN_A_WEEK - month.day();
    const monthAfter = month.add(1, 'month').startOf('month');

    for (let i = 0; i < countOfDaysAfterMonthEnd; i++) {
      const date = monthAfter.add(i, 'days');

      days.push({
        date,
        belongsToSelectedMonth: false,
        onClick: () => console.log(date.toString()),
        isCurrentDate: date.isSame(day(), 'date'),
        isSelectionnedDate: date.isSame(selectedDate, 'date'),
      });
    }

    return days;
  }, [month, selectedDate]);
  console.log(calendar);

  return (
    <div ref={ref} style={{ display: 'flex', gap: '5px' }}>
      {calendar.map((entry) => (
        <div
          key={`date-picker-day-${entry.isSelectionnedDate}-${
            entry.isCurrentDate
          }-${entry.date.date()}-${entry.date.month()}-${
            entry.belongsToSelectedMonth
          }`}
          style={{
            color: `${entry.belongsToSelectedMonth ? 'black' : 'gray'}`,
          }}
        >
          {children(entry)}
        </div>
      ))}
    </div>
  );
});
