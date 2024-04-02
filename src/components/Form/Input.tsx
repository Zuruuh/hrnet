import type { HTMLProps, FC, MutableRefObject } from 'react';
import { Input, Label, TextField } from 'react-aria-components';
import { type AnyField, inputStyle, labelStyle, ErrorMessage } from './shared';

export interface InputProps extends HTMLProps<HTMLInputElement> {
  field: AnyField;
  label: string;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
}

const CustomInput: FC<InputProps> = ({
  field,
  label,
  inputRef,
  ...inputProps
}) => {
  if (!inputProps.className) {
    inputProps.className = '';
  }

  inputProps.className += ` ${inputStyle}`;

  return (
    <TextField
      isInvalid={field.state.meta.errors.length > 0}
      defaultValue={field.state.value}
    >
      <Label className={labelStyle}>{label}</Label>
      <Input
        name={field.name}
        ref={inputRef}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.currentTarget.value)}
        {...inputProps}
      />
      <ErrorMessage field={field} />
    </TextField>
  );
};

export { CustomInput as Input };
