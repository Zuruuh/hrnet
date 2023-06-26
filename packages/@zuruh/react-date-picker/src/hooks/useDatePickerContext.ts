import { useContext } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';
import { DatePickerState } from '../state/DatePickerState';

export function useDatePickerContext(): DatePickerState {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error('Uninitialized date picker context used!');
  }

  return context;
}
