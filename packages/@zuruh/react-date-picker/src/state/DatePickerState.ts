import type { Setter } from '../types/setter';

export type DatePickerState =
  | ({ initialized: false } & UninitializedDatePickerState)
  | ({ initialized: true } & InitializedDatePickerState);

export interface UninitializedDatePickerState {
  selectedDate: Date | null;
  setSelectedDate: Setter<Date | null> | null;
}

export interface InitializedDatePickerState {
  selectedDate: Date | null;
  setSelectedDate: Setter<Date | null>;
}
