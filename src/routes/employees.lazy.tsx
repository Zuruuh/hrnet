import { createFileRoute } from '@tanstack/react-router';
import type { FC } from 'react';

const EmployeePage: FC = () => {
  return <h1>HelloWorld</h1>;
};

export const Route = createFileRoute('/employees')({
  component: EmployeePage,
});
