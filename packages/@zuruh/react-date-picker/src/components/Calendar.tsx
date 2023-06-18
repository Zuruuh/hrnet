import { type ReactNode, forwardRef } from 'react';

export interface CalendarProps {
  children: ReactNode;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar({ children }, ref) {
    return <div ref={ref}>{children}</div>;
  }
);
