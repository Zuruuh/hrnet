import { type ReactNode, type FC, Fragment } from 'react';
import day from 'dayjs';

export interface CalendarInnerProps {
  weekNumber: number;
}

export interface CalendarProps {
  children: ReactNode | ((props: CalendarInnerProps) => ReactNode);
}

export const Calendar: FC<CalendarProps> = ({ children }) => {
  const date = day().set('date', 1);

  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Fragment key={i}>
          {typeof children === 'function'
            ? children({ weekNumber: date.add(i, 'week').week() })
            : children}
        </Fragment>
      ))}
    </>
  );
};
