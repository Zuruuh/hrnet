import { createFileRoute } from '@tanstack/react-router';
import { useState, type FC } from 'react';
import { DatePicker } from '../components/DatePicker';
import type { Dayjs } from 'dayjs';

const EmployeePage: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  return (
    <DatePicker setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
  );
};

export const Route = createFileRoute('/employees')({
  component: EmployeePage,
});
