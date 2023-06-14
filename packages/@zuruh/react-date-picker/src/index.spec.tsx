import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DatePicker } from './DatePicker';

test('something', async () => {
  const screen = render(
    <DatePicker
      onSelect={() => {
        /**/
      }}
    />
  );

  expect(screen.findByTestId('date-picker')).not.toBeNull();
});
