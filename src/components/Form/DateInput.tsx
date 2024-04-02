import type { FC, HTMLProps, MutableRefObject } from 'react';
import {
  ErrorMessage,
  floatingButtonStyle,
  inputStyle,
  labelStyle,
  type AnyField,
} from './shared';
import {
  Button,
  DialogTrigger,
  Input,
  Label,
  Popover,
  TextField,
} from 'react-aria-components';
import { css } from '../../../styled-system/css';
import { DatePicker, DatePickerProps } from '../DatePicker';
import dayjs from 'dayjs';

export interface DateInputProps extends HTMLProps<HTMLInputElement> {
  field: AnyField;
  label: string;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  datePickerOptions?: Omit<DatePickerProps, 'selectedDate' | 'setSelectedDate'>;
}

export const DAYJS_HTML5_FORMAT = 'YYYY-MM-DD';

export const DateInput: FC<DateInputProps> = ({
  field,
  label,
  inputRef,
  datePickerOptions = {},
  ...inputProps
}) => {
  if (!inputProps.className) {
    inputProps.className = '';
  }

  inputProps.className += ` ${inputStyle} `;
  inputProps.className += css({
    '&::-webkit-calendar-picker-indicator': { display: 'none' },
    '&::-webkit-input-placeholder': { visibility: 'hidden!' },
  });

  // console.log(field.state.meta.errors);

  return (
    <DialogTrigger>
      <TextField isInvalid={field.state.meta.errors.length > 0}>
        <Label className={labelStyle}>{label}</Label>
        <div className={css({ position: 'relative' })}>
          <Input
            value={field.state.value ?? ''}
            name={field.name}
            type="date"
            ref={inputRef}
            onBlur={field.handleBlur}
            onChange={(e) => {
              field.handleChange(e.currentTarget.value);
            }}
            {...inputProps}
          />
          <Button className={floatingButtonStyle}>{'📅'}</Button>
        </div>
        <Popover>
          <DatePicker
            selectedDate={
              field.state.value
                ? dayjs(field.state.value, DAYJS_HTML5_FORMAT)
                    .hour(2)
                    .minute(0)
                    .second(0)
                : null
            }
            setSelectedDate={(date) => {
              // @ts-expect-error
              field.handleChange(date.format(DAYJS_HTML5_FORMAT));
            }}
            {...datePickerOptions}
          />
        </Popover>
        <ErrorMessage field={field} />
      </TextField>
    </DialogTrigger>
  );
};
