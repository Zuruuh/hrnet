import { type FC, type ReactNode } from 'react';
import type { Dayjs } from 'dayjs';

export interface DayInnerProps {
  onClick(): void;
  isCurrentDate: boolean;
  isSelectionnedDate: boolean;
  belongsToSelectedMonth: boolean;
  date: Dayjs;
}

export interface DayProps {
  children(props: DayInnerProps): ReactNode;
}

export const Day: FC<DayProps> = ({ children }) => {
  return <></>;
};
