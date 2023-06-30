import { useEffect, useState } from 'react';
import { DatePicker } from './';
import type { Story } from '@ladle/react';
import { withStrictMode } from './ladle/decorators/withStrictMode';
import day, { type Dayjs } from 'dayjs';
import week from 'dayjs/plugin/weekOfYear';

day.extend(week);

export const HelloWorld: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <DatePicker.Root setSelectedDate={setDate} selectedDate={date}>
      <DatePicker.Calendar>
        {({ weekNumber }) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <p>{weekNumber}</p>
            <DatePicker.Week>
              <div style={{ display: 'flex' }}>
                <DatePicker.Day>
                  {({ onClick: onDayClick, date: dayDate }) => (
                    <div onClick={onDayClick}>{dayDate.date()}</div>
                  )}
                </DatePicker.Day>
              </div>
            </DatePicker.Week>
          </div>
        )}
      </DatePicker.Calendar>
    </DatePicker.Root>
  );
};

HelloWorld.decorators = [withStrictMode];
