import { type ReactNode, type FC } from 'react';

export interface CalendarProps {
  children: ReactNode | (() => ReactNode);
}

export const Calendar: FC<CalendarProps> = ({ children }) => {
  return <>{typeof children === 'function' ? children() : children}</>;
};
