import React, { type FC } from 'react';
import date from 'dayjs';

export interface DatePickerProps {
  e?: null;
}

// export const DatePicker: FC<DatePickerProps> = forwardRef<
//   HTMLDivElement,
//   DatePickerProps
// >((props, ref): ReactElement => {
//   return <div ref={ref}></div>;
// });

export const DatePicker: FC<DatePickerProps> = () => {
  const years = Array.from({ length: 16 });
  return <></>;
};
DatePicker.displayName = 'DayPicker';
