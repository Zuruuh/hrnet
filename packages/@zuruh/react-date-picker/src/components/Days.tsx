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
const DAYS_COUNT_IN_A_WEEK = 6; // range from 0 to 6 where 0 is Sunday and 6 is Saturday

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
  const calendar: DaysInnerProps[][] = useMemo(() => {
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
    const monthAfter = month.add(1, 'month');

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

    return days.reduce(
      (prev: DaysInnerProps[][], curr, index): DaysInnerProps[][] => {
        if (index % 7 === 0 && index > 0) {
          return [...prev, [curr]];
        }

        prev.at(-1)!.push(curr);
        return prev;
      },
      [[]]
    );
  }, [month, selectedDate]);

  return (
    <div
      ref={ref}
      style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
    >
      {calendar.map((entries) => (
        <div
          style={{ display: 'flex', gap: '5px' }}
          key={JSON.stringify(entries)}
        >
          {entries.map((entry) => (
            <div
              key={JSON.stringify(entry)}
              style={{
                color: `${entry.belongsToSelectedMonth ? 'black' : 'gray'}`,
              }}
            >
              {children(entry)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});
