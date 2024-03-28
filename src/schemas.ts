import dayjs from 'dayjs';
import * as v from 'valibot';

export const Departments = [
  'Sales',
  'Marketing',
  'Engineering',
  'Human Resources',
  'Legal',
];

export const Department = v.union(
  Departments.map((department) => v.literal(department)),
);
export type Department = v.Output<typeof Department>;

export const Name = v.string([
  v.minLength(2, 'Value should be at least 2 chars'),
]);
export type Name = v.Output<typeof Name>;

export const AddressField = v.string([
  v.minLength(2, 'Value should be at least 2 chars'),
]);
export type AddressField = v.Output<typeof AddressField>;

export const Zipcode = v.string([v.regex(/^\d{5}$/, 'Invalid zipcode')]);
export type Zipcode = v.Output<typeof Zipcode>;

export const Employee = v.object({
  firstName: Name,
  lastName: Name,
  birthDate: v.date([v.minValue(dayjs().subtract(18, 'years').toDate())]),
  startDate: v.date(),
  street: AddressField,
  city: AddressField,
  state: AddressField,
  zipcode: Zipcode,
  department: Department,
});
export type Employee = v.Output<typeof Employee>;
