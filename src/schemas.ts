import dayjs from 'dayjs';
import {
  object,
  string,
  minLength,
  date,
  minValue,
  regex,
  union,
  literal,
  type Output,
} from 'valibot';

export const Departments = [
  'Sales',
  'Marketing',
  'Engineering',
  'Human Resources',
  'Legal',
];

export const Department = union(
  Departments.map((department) => literal(department)),
);

export type Department = Output<typeof Department>;

export const Employee = object({
  firstName: string([minLength(1)]),
  lastName: string([minLength(1)]),
  birthDate: date([minValue(dayjs().subtract(18, 'years').toDate())]),
  startDate: date(),
  street: string([minLength(1)]),
  city: string([minLength(1)]),
  state: string([minLength(1)]),
  zipcode: string([regex(/^\d{5}$/)]),
  department: Department,
});

export type Employee = Output<typeof Employee>;
