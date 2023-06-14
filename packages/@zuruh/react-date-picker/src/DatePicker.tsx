import { type FC } from 'react';

export interface DatePickerProps {
  onSelect: (date: Date) => void;
}

export const DatePicker: FC<DatePickerProps> = () => {
  return <div data-testid="date-picker">Hello, World!</div>;
};
