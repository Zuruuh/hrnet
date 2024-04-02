import type { FieldApi } from '@tanstack/react-form';
import type { HTMLProps, FC, MutableRefObject } from 'react';
import {
  Button,
  ComboBox,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  TextField,
} from 'react-aria-components';
import { css } from '../../styled-system/css';

const inputStyle = css({
  height: 10,
  width: 'full',
  rounded: 'sm',
  borderWidth: 1,
  borderColor: 'gray.300',
  paddingX: 3,
  paddingY: 2,
  fontSize: 'sm',
  ringColor: 'gray.400',
  _disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  '&[aria-invalid]': {
    borderColor: 'red',
  },
});

const labelStyle = css({
  fontSize: 'sm',
  fontWeight: 500,
  marginTop: 2,
});

// biome-ignore lint/suspicious/noExplicitAny:
type AnyField = FieldApi<any, any, any, any>;

export interface FieldProps extends HTMLProps<HTMLInputElement> {
  field: AnyField;
  label: string;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
}

export interface SelectProps extends HTMLProps<HTMLInputElement> {
  field: AnyField;
  label: string;
  options: Array<string>;
  selectRef?: MutableRefObject<HTMLInputElement | null>;
}

export const Select: FC<SelectProps> = ({
  field,
  label,
  options,
  selectRef,
  ...selectProps
}) => {
  if (!selectProps.className) {
    selectProps.className = '';
  }

  selectProps.className += ` ${inputStyle}`;

  return (
    <ComboBox
      isInvalid={field.state.meta.errors.length > 0}
      defaultInputValue={field.state.value}
      onInputChange={(e) => field.handleChange(e)}
    >
      <Label className={labelStyle}>{label}</Label>
      <div className={css({ position: 'relative' })}>
        <Input
          {...selectProps}
          name={field.name}
          ref={selectRef}
          onBlur={field.handleBlur}
        />
        <Button
          className={css({
            position: 'absolute',
            top: '50%',
            right: 2,
            cursor: 'pointer',
            transform: 'translateY(-50%)',
          })}
        >
          ▼
        </Button>
      </div>
      <Popover
        className={css({
          backgroundColor: 'white',
          overflowY: 'auto',
          width: 'var(--trigger-width)',
          rounded: 'sm',
          borderWidth: 1,
          borderColor: 'black',
        })}
      >
        <ListBox>
          {options.map((option) => (
            <ListBoxItem
              className={css({
                '&[data-selected]': {
                  fontWeight: 'bold',
                },
                '&[data-focused]': {
                  backgroundColor: 'blue.500',
                  color: 'white',
                },
              })}
              key={option}
            >
              {option}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
      <div
        className={css({
          fontSize: 'xs',
          color: 'red.500',
          minHeight: '18px',
        })}
      >
        <FieldError>{field.state.meta.errors.at(0)}</FieldError>
      </div>
    </ComboBox>
  );
};

const CustomInput: FC<FieldProps> = ({
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
    <>
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

        <div
          className={css({
            fontSize: 'xs',
            color: 'red.500',
            minHeight: '18px',
          })}
        >
          <FieldError>{field.state.meta.errors.at(0)}</FieldError>
        </div>
      </TextField>
    </>
  );
};

export { CustomInput as Input };
