import { createContext } from 'react';
import { DatePickerState } from '../state/DatePickerState';

export const DatePickerContext = createContext<DatePickerState | undefined>(
  undefined
);
