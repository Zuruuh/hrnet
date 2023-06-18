import { type ReactNode, forwardRef, useCallback } from 'react';
import { useDatePickerContext } from '../hooks/useDatePickerContext';

export interface DaysInnerProps {
  onClick(): void;
  isCurrentDate: boolean;
  isSelectionnedDate: boolean;
  belongsToBrowsedMonth: boolean;
  dayNumber: number;
}

export interface DaysProps {
  children: (props: DaysInnerProps) => ReactNode;
}

export const Days = forwardRef<HTMLDivElement, DaysProps>(function Days(
  { children },
  ref
) {
  const { setSelectedDate } = useDatePickerContext();
  const onClick = useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [setSelectedDate]
  );

  return (
    <div ref={ref}>
      {Array.from({ length: 29 }).map((_, index) => (
        <div key={`date-picker-day-${index}`}>
          {children({
            onClick: () => onClick(new Date()),
            dayNumber: index + 1,
            belongsToBrowsedMonth: true,
            isSelectionnedDate: index === 15,
            isCurrentDate: index === 10,
          })}
        </div>
      ))}
    </div>
  );
});
