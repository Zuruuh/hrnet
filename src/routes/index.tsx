import { useCallback, type FC, useId } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Departments, Employee } from '../schemas';
import { useQuery } from '@tanstack/react-query';

export const HomePage: FC = () => {
  const form = useForm<Employee>({ resolver: valibotResolver(Employee) });
  const createEmployee: SubmitHandler<Employee> = useCallback((employee) => {
    console.log(employee);
  }, []);

  const firstNameId = useId();
  const lastNameId = useId();
  // const birthDateId = useId();
  // const startDateId = useId();
  const streetId = useId();
  const cityId = useId();
  const stateId = useId();
  const statesDatalistId = useId();
  const zipCodeId = useId();
  const departmentId = useId();

  const { data: states, isSuccess: areStatesLoaded } = useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      return (await import('../data/states')).states;
    },
  });

  return (
    <section>
      <header>
        <h4>Create New Employee</h4>
        <p>Enter the employee's information below.</p>
      </header>
      <form onSubmit={form.handleSubmit(createEmployee)}>
        <div>
          <div>
            <label htmlFor={firstNameId}>First name</label>
            <input
              {...form.register('firstName')}
              autoFocus
              autoComplete="given-name"
              id={firstNameId}
            />
          </div>

          <div>
            <label htmlFor={lastNameId}>Last name</label>
            <input
              {...form.register('lastName')}
              autoComplete="family-name"
              id={lastNameId}
            />
          </div>
        </div>

        <div>{/* TODO: add date picker inputs here*/}</div>

        <fieldset>
          <div>
            <label htmlFor={streetId}>Street</label>
            <input
              {...form.register('street')}
              autoComplete="street-address"
              id={streetId}
            />
          </div>

          <div>
            <div>
              <label htmlFor={cityId}>City</label>
              <input {...form.register('city')} id={cityId} />
            </div>
            <div>
              <label htmlFor={stateId}>State</label>
              {areStatesLoaded ? (
                <>
                  <input
                    {...form.register('state')}
                    id={stateId}
                    list={statesDatalistId}
                  />
                  <datalist id={statesDatalistId}>
                    {states.map((state) => (
                      <option
                        value={state.abbreviation}
                        key={state.abbreviation}
                      >
                        {state.name}
                      </option>
                    ))}
                  </datalist>
                </>
              ) : (
                // todo add a spinner loader here
                <input {...form.register('state')} id={stateId} />
              )}
            </div>
          </div>

          <div>
            <label htmlFor={zipCodeId}>Zip Code</label>
            <input
              {...form.register('zipcode')}
              autoComplete="postal-code"
              id={zipCodeId}
            />
          </div>

          <div>
            <label htmlFor={departmentId}>Department</label>
            <select {...form.register('department')} id={departmentId}>
              {Departments.map((department) => (
                <option key={department}>{department}</option>
              ))}
            </select>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

//
// <main className="flex flex-col items-center justify-center flex-1 py-12">
//       <Card className="w-full max-w-2xl">
//         <CardHeader>
//           <CardTitle>Create New Employee</CardTitle>
//           <CardDescription>Enter the employee's information below.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="first-name">First Name</Label>
//               <Input id="first-name" placeholder="John" required />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="last-name">Last Name</Label>
//               <Input id="last-name" placeholder="Doe" required />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="dob">Date of Birth</Label>
//               <Input id="dob" required type="date" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="start-date">Start Date</Label>
//               <Input id="start-date" required type="date" />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="street">Street</Label>
//             <Input id="street" placeholder="123 Main St" required />
//           </div>
//           <div className="grid grid-cols-3 gap-4">
//             <div className="space-y-2 col-span-2">
//               <Label htmlFor="city">City</Label>
//               <Input id="city" placeholder="San Francisco" required />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="state">State</Label>
//               <Input id="state" placeholder="CA" required />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="zip">Zip Code</Label>
//             <Input id="zip" placeholder="94103" required />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="department">Department</Label>
//             <Select>
//               <SelectTrigger id="department">
//                 <SelectValue placeholder="Select" />
//               </SelectTrigger>
//               <SelectContent position="popper">
//                 <SelectItem value="hr">Human Resources</SelectItem>
//                 <SelectItem value="it">Information Technology</SelectItem>
//                 <SelectItem value="finance">Finance</SelectItem>
//                 <SelectItem value="marketing">Marketing</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button className="ml-auto">Create Employee</Button>
//         </CardFooter>
//       </Card>
//     </main>

//       <button onclick="saveEmployee()">Save</button>
//     </div>
//     <div id="confirmation" class="modal">Employee Created!</div>
//
//   </>
//   );

export const Route = createFileRoute('/')({
  component: HomePage,
});
