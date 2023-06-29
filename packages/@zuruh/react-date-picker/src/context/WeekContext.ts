import { createContext, useContext } from 'react';

export interface WeekContextState {
  weekNumber: number;
}

const WeekContext = createContext<WeekContextState | undefined>(undefined);

export function useWeekContext(): WeekContextState {
  const state = useContext(WeekContext);
  if (state === undefined) {
    throw new Error(
      'Uninitialized week context used! ' +
        'You probably tried to render a <DatePicker.Day> element without wrapping it in a <DatePicker.Week>'
    );
  }

  return state;
}
