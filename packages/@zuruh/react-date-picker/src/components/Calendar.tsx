import { ReactNode, forwardRef } from 'react';

export interface CalendarProps {
  children: () => ReactNode;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar({ children }, ref): ReactNode {
    return <div ref={ref}>{children()}</div>;
  }
);
