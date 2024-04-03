import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Employee } from '../schemas';

export interface EmployeesState {
  employees: Array<Employee>;
  add(employee: Employee): void;
}

export const useEmployeesStore = create<EmployeesState>()(
  persist(
    (set) => ({
      employees: [],
      add: (employee) =>
        set((value) => ({
          ...value,
          employees: [...value.employees, employee],
        })),
    }),
    { name: 'employees' },
  ),
);
