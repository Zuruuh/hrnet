import { useState } from 'react';
import { DatePicker } from './';
import type { Story } from '@ladle/react';
import { withStrictMode } from './ladle/decorators/withStrictMode';

export const World: Story = () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker.Root setSelectedDate={setDate} selectedDate={date}>
      <DatePicker.Calendar>
        <DatePicker.Days>
          {(props) => <div onClick={props.onClick}>{props.dayNumber}</div>}
        </DatePicker.Days>
      </DatePicker.Calendar>
    </DatePicker.Root>
  );
};

World.decorators = [withStrictMode];
