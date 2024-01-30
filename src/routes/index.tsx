import { useCallback, type FC, useId } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Departments, Employee } from '../schemas';
import { useQuery } from '@tanstack/react-query';
import { css } from '../../styled-system/css';
import clsx from 'clsx';

const inputStyle = css({
  height: 10,
  width: 'full',
  rounded: 'sm',
  borderWidth: 1,
  borderColor: 'hsl(240 5.9% 90%)',
  paddingX: 3,
  paddingY: 2,
  fontSize: 'sm',
  ringColor: 'hsl(240 5.9% 90%)',
  _disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
});

const labelStyle = css({
  fontSize: 'sm',
  fontWeight: 500,
  marginTop: 2,
  _peerDisabled: { cursor: 'not-allowed', opacity: 0.7 },
});

const fieldStyle = css({
  display: 'flex',
  flexDirection: 'column-reverse',
  width: 'full',
});

const fieldLineStyle = css({
  display: 'grid',
  gridTemplateColumns: 1,
  gap: 4,
  sm: {
    gridTemplateColumns: 2,
  },
});

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
    <section
      className={css({
        flexGrow: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <article
        className={css({
          backgroundColor: 'white',
          rounded: 'lg',
          shadow: 'sm',
          border: 1,
          padding: 6,
          maxWidth: '2xl',
        })}
      >
        <header
          className={css({
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1.5,
            paddingBottom: 3,
          })}
        >
          <h3 className={css({ fontSize: '2xl', fontWeight: 600 })}>
            Create New Employee
          </h3>
          <p className={css({ fontSize: 'sm', color: 'gray.500' })}>
            Enter the employee's information below.
          </p>
        </header>
        <form onSubmit={form.handleSubmit(createEmployee)}>
          <div className={fieldLineStyle}>
            <div className={fieldStyle}>
              <input
                {...form.register('firstName')}
                autoFocus
                autoComplete="given-name"
                placeholder="John"
                className={clsx('peer', inputStyle)}
                id={firstNameId}
              />
              <label className={labelStyle} htmlFor={firstNameId}>
                First name
              </label>
            </div>

            <div className={fieldStyle}>
              <input
                {...form.register('lastName')}
                autoComplete="family-name"
                placeholder="Doe"
                className={clsx('peer', inputStyle)}
                id={lastNameId}
              />
              <label className={labelStyle} htmlFor={lastNameId}>
                Last name
              </label>
            </div>
          </div>

          <div>{/* TODO: add date picker inputs here*/}</div>

          <fieldset
            className={css({
              // space-y-4 border border-gray-200 rounded-md p-4
              marginY: 4,
              borderWidth: 1,
              borderColor: 'gray.200',
              rounded: 'md',
              padding: 4,
              paddingTop: 2,
            })}
          >
            <legend
              className={css({
                fontWeight: 500,
                fontSize: 'lg',
              })}
            >
              Address
            </legend>
            <div className={fieldStyle}>
              <input
                {...form.register('street')}
                autoComplete="street-address"
                placeholder="123 Main Street"
                className={clsx('peer', inputStyle)}
                id={streetId}
              />
              <label className={labelStyle} htmlFor={streetId}>
                Street
              </label>
            </div>

            <div className={fieldLineStyle}>
              <div className={fieldStyle}>
                <input
                  {...form.register('city')}
                  placeholder="San Fransisco"
                  className={clsx('peer', inputStyle)}
                  id={cityId}
                />
                <label className={labelStyle} htmlFor={cityId}>
                  City
                </label>
              </div>
              <div className={fieldStyle}>
                {areStatesLoaded ? (
                  <>
                    <input
                      {...form.register('state')}
                      id={stateId}
                      placeholder="CA"
                      className={clsx('peer', inputStyle)}
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
                  <input
                    {...form.register('state')}
                    placeholder="CA"
                    className={clsx('peer', inputStyle)}
                    id={stateId}
                  />
                )}
                <label htmlFor={stateId}>State</label>
              </div>
            </div>

            <div className={fieldStyle}>
              <input
                {...form.register('zipcode')}
                autoComplete="postal-code"
                placeholder="93190"
                className={clsx('peer', inputStyle)}
                id={zipCodeId}
              />
              <label className={labelStyle} htmlFor={zipCodeId}>
                Zip Code
              </label>
            </div>

            <div className={fieldStyle}>
              <select
                className={clsx('peer', inputStyle)}
                {...form.register('department')}
                id={departmentId}
              >
                {Departments.map((department) => (
                  <option key={department}>{department}</option>
                ))}
              </select>
              <label className={labelStyle} htmlFor={departmentId}>
                Department
              </label>
            </div>
          </fieldset>

          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <button
              type="submit"
              className={css({
                whiteSpace: 'nowrap',
                rounded: 'md',
                fontSize: 'sm',
                fontWeight: 500,
                backgroundColor: 'black',
                color: 'white',
                height: 10,
                paddingX: 4,
                paddingY: 2,
                marginLeft: 'auto',
                cursor: 'pointer',
                ringOffset: 1,
                _active: {
                  opacity: 0.9,
                },
              })}
            >
              Create Employee
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

// <div id="confirmation" class="modal">Employee Created!</div>

export const Route = createFileRoute('/')({
  component: HomePage,
});
