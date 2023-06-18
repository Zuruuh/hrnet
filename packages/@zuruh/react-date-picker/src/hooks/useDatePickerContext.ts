import { useContext } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';
import { InitializedDatePickerState } from '../state/DatePickerState';

export function useDatePickerContext(): InitializedDatePickerState {
  const context = useContext(DatePickerContext);
  if (!context.initialized) {
    throw new Error('Uninitialized date picker context used!');
  }

  return context;
}
