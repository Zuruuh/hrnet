import type { FieldApi } from '@tanstack/react-form';
import { css } from '../../../styled-system/css';
import type { FC } from 'react';
import { FieldError } from 'react-aria-components';

export const inputStyle = css({
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

export const labelStyle = css({
  fontSize: 'sm',
  fontWeight: 500,
  marginTop: 2,
});

export const errorStyle = css({
  fontSize: 'xs',
  color: 'red.500',
});

export const floatingButtonStyle = css({
  position: 'absolute',
  top: '50%',
  right: 2,
  cursor: 'pointer',
  transform: 'translateY(-50%)',
});

export const ErrorMessage: FC<{ field: AnyField }> = ({ field }) => (
  <div className={css({ minHeight: '24px' })}>
    <FieldError className={css({ fontSize: 'xs', color: 'red.500' })}>
      {() => field.state.meta.errors.at(0)}
    </FieldError>
  </div>
);

// biome-ignore lint/suspicious/noExplicitAny:
export type AnyField = FieldApi<any, any, any, any>;
