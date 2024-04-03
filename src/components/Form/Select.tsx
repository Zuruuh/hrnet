import type { FC, MutableRefObject, HTMLProps } from 'react';
import {
  ErrorMessage,
  floatingButtonStyle,
  inputStyle,
  labelStyle,
  type AnyField,
} from './shared';
import { css } from '../../../styled-system/css';
import {
  Button,
  ComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
} from 'react-aria-components';

export const popoverStyle = css({
  backgroundColor: 'white',
  overflowY: 'auto',
  width: 'var(--trigger-width)',
  rounded: 'sm',
  borderWidth: 1,
  borderColor: 'black',
});

export const listBoxItemStyle = css({
  '&[data-selected]': {
    fontWeight: 'bold',
  },
  '&[data-focused]': {
    backgroundColor: 'blue.500',
    color: 'white',
  },
});

export interface SelectProps extends HTMLProps<HTMLInputElement> {
  field: AnyField;
  label: string;
  options: Array<string>;
  selectRef?: MutableRefObject<HTMLInputElement | null>;
}

const CustomComboBox: FC<SelectProps> = ({
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
      allowsCustomValue
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
        <Button className={floatingButtonStyle}>{'▼'}</Button>
      </div>
      <Popover className={popoverStyle}>
        <ListBox>
          {options.map((option) => (
            <ListBoxItem className={listBoxItemStyle} key={option}>
              {option}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
      <ErrorMessage field={field} />
    </ComboBox>
  );
};

export { CustomComboBox as ComboBox };
