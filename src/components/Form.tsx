import { FieldApi } from '@tanstack/react-form';
import { type HTMLProps, type FC, MutableRefObject } from 'react';
import { css } from '../../styled-system/css';

const inputStyle = css({
  height: 10,
  width: 'full',
  rounded: 'sm',
  borderWidth: 1,
  borderColor: 'hsl(240 5.9% 90%)',
  paddingX: 3,
  paddingY: 2,
  fontSize: 'sm',
  ringColor: 'hsl(240 5.9% 90%)',
  _disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
});

const labelStyle = css({
  fontSize: 'sm',
  fontWeight: 500,
  marginTop: 2,
  _peerDisabled: { cursor: 'not-allowed', opacity: 0.7 },
});

const FieldInfo: FC<{ field: FieldApi<any, any, any, any> }> = ({ field }) => {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em
          className={css({
            fontSize: 'xs',
            color: 'red.500',
            minHeight: '18px',
          })}
        >
          {field.state.meta.touchedErrors}
        </em>
      ) : null}
    </>
  );
};

export interface FieldProps extends HTMLProps<HTMLInputElement> {
  field: FieldApi<any, any, any, any>;
  label: string;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
}

export interface SelectProps extends HTMLProps<HTMLSelectElement> {
  field: FieldApi<any, any, any, any>;
  label: string;
  options: string[];
  selectRef?: MutableRefObject<HTMLSelectElement | null>;
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
  selectProps.className += 'peer ' + inputStyle;

  return (
    <>
      <FieldInfo field={field} />
      <select
        id={field.name}
        name={field.name}
        value={field.state.value}
        ref={selectRef}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <label className={labelStyle} htmlFor={field.name}>
        {label}
      </label>
    </>
  );
};

export const Input: FC<FieldProps> = ({
  field,
  label,
  inputRef,
  ...inputProps
}) => {
  if (!inputProps.className) {
    inputProps.className = '';
  }
  inputProps.className += 'peer ' + inputStyle;

  return (
    <>
      <FieldInfo field={field} />
      <input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        ref={inputRef}
        onChange={(e) => field.handleChange(e.target.value)}
        {...inputProps}
      />
      <label htmlFor={field.name} className={labelStyle}>
        {label}
      </label>
    </>
  );
};
