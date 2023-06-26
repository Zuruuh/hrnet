import type { Setter } from '../types/setter';
import type { Dayjs } from 'dayjs';

export interface DatePickerState {
  selectedDate: Dayjs | null;
  setSelectedDate: Setter<Dayjs | null>;
  temporarySelectedMonth: number;
  setTemporarySelectedMonth: Setter<number>;
  temporarySelectedYear: number;
  setTemporarySelectedYear: Setter<number>;
}
