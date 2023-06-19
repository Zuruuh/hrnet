import type { Setter } from '../types/setter';
import type { Dayjs } from 'dayjs';

export type DatePickerState =
  | ({ initialized: false } & UninitializedDatePickerState)
  | ({ initialized: true } & InitializedDatePickerState);

export type UninitializedDatePickerState = Record<PropertyKey, unknown>;

export interface InitializedDatePickerState {
  selectedDate: Dayjs | null;
  setSelectedDate: Setter<Dayjs | null>;
  temporarySelectedMonth: number;
  setTemporarySelectedMonth: Setter<number>;
  temporarySelectedYear: number;
  setTemporarySelectedYear: Setter<number>;
}
