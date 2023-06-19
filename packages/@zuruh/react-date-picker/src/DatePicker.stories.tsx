import { useState } from 'react';
import { DatePicker } from './';
import type { Story } from '@ladle/react';
import { withStrictMode } from './ladle/decorators/withStrictMode';
import { type Dayjs } from 'dayjs';

export const World: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <DatePicker.Root setSelectedDate={setDate} selectedDate={date}>
      <DatePicker.Calendar>
        <DatePicker.Days
          style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          {(props) => <div onClick={props.onClick}>{props.date.date()}</div>}
        </DatePicker.Days>
      </DatePicker.Calendar>
    </DatePicker.Root>
  );
};

World.decorators = [withStrictMode];
