import dayjs from 'dayjs';
import { z } from 'zod';
import { DAYJS_HTML5_FORMAT } from './components/Form/DateInput';

export const Departments = z.enum([
  'Sales',
  'Marketing',
  'Engineering',
  'Human Resources',
  'Legal',
] as const);

export const Name = z
  .string()
  .min(2, 'Value should be at least 2 chars')
  .transform((name) => name.charAt(0).toUpperCase().concat(name.slice(1)));
export type Name = z.infer<typeof Name>;

export const AddressField = z
  .string()
  .min(2, 'Value should be at least 2 chars');
export type AddressField = z.infer<typeof AddressField>;

export const Zipcode = z.string().regex(/^\d{5}$/, 'Invalid zipcode');
export type Zipcode = z.infer<typeof Zipcode>;

export const Date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export type Date = z.infer<typeof Date>;

export const BirthDate = Date.refine((date) =>
  dayjs(date, DAYJS_HTML5_FORMAT).isBefore(
    dayjs().subtract(18, 'years').startOf('month'),
  ),
);
export type BirthDate = z.infer<typeof BirthDate>;

export const Employee = z.object({
  id: z.string().uuid(),
  firstName: Name,
  lastName: Name,
  birthDate: BirthDate,
  startDate: Date,
  street: AddressField,
  city: AddressField,
  state: AddressField,
  zipcode: Zipcode,
  department: Departments,
});
export type Employee = z.infer<typeof Employee>;
