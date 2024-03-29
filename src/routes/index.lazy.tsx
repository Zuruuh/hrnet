import { useEffect, useId, useRef, type FC } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { valibotValidator } from '@tanstack/valibot-form-adapter';
import { AddressField, Departments, Name, Zipcode } from '../schemas';
import { useQuery } from '@tanstack/react-query';
import { css } from '../../styled-system/css';
import { Input, Select } from '../components/Form';
import * as v from 'valibot';

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
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      department: Departments[0],
      birthDate: new Date(),
      startDate: new Date(),
    },
    onSubmit: ({ value: employee }) => {
      console.log(employee);
    },
    validatorAdapter: valibotValidator,
  });

  const { data: states, isSuccess: areStatesLoaded } = useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      return (await import('../data/states')).states;
    },
  });

  const statesDataListId = useId();

  const firstNameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    firstNameInputRef.current?.focus();
  }, []);

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div className={fieldLineStyle}>
            <div className={fieldStyle}>
              <form.Field
                name="firstName"
                validators={{
                  onChangeAsync: Name,
                  onChangeAsyncDebounceMs: 1500,
                }}
              >
                {(field) => (
                  <Input
                    field={field}
                    label="First name"
                    inputRef={firstNameInputRef}
                    autoComplete="given-name"
                    placeholder="John"
                    required
                  />
                )}
              </form.Field>
            </div>

            <div className={fieldStyle}>
              <form.Field
                name="lastName"
                validators={{
                  onChangeAsyncDebounceMs: 1500,
                  onChangeAsync: Name,
                }}
              >
                {(field) => (
                  <Input
                    field={field}
                    label="Last name"
                    autoComplete="family-name"
                    placeholder="Doe"
                    required
                  />
                )}
              </form.Field>
            </div>
          </div>

          <div>{/* TODO: add date picker inputs here*/}</div>

          <fieldset
            className={css({
              // space-y-4 border border-gray-200 rounded-md p-4
              marginBottom: 4,
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
              <form.Field
                name="street"
                validators={{
                  onChangeAsyncDebounceMs: 1500,
                  onChangeAsync: AddressField,
                }}
              >
                {(field) => (
                  <>
                    <Input
                      field={field}
                      label="Street"
                      placeholder="123 Main Street"
                      autoComplete="street-address"
                      required
                    />
                  </>
                )}
              </form.Field>
            </div>

            <div className={fieldLineStyle}>
              <div className={fieldStyle}>
                <form.Field
                  name="city"
                  validators={{
                    onChangeAsyncDebounceMs: 1500,
                    onChangeAsync: AddressField,
                  }}
                >
                  {(field) => (
                    <>
                      <Input
                        field={field}
                        label="City"
                        placeholder="San Fransisco"
                        required
                      />
                    </>
                  )}
                </form.Field>
              </div>
              <div className={fieldStyle}>
                <form.Field
                  name="state"
                  validators={{
                    onSubmit: areStatesLoaded
                      ? v.union(
                          states!.map((state) => v.literal(state.abbreviation)),
                          'Invalid state',
                        )
                      : undefined,
                  }}
                >
                  {(field) => (
                    <>
                      <Input
                        field={field}
                        label="State"
                        placeholder="CA"
                        required
                        list={areStatesLoaded ? statesDataListId : undefined}
                      />
                    </>
                  )}
                </form.Field>
                {areStatesLoaded ? (
                  <datalist id={statesDataListId}>
                    {states.map((state) => (
                      <option
                        value={state.abbreviation}
                        key={state.abbreviation}
                      >
                        {state.name}
                      </option>
                    ))}
                  </datalist>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className={fieldStyle}>
              <form.Field
                name="zipcode"
                validators={{
                  onChangeAsyncDebounceMs: 1500,
                  onChangeAsync: Zipcode,
                }}
              >
                {(field) => (
                  <>
                    <Input
                      field={field}
                      label="Zip Code"
                      autoComplete="postal-code"
                      placeholder="93190"
                      required
                    />
                  </>
                )}
              </form.Field>
            </div>

            <div className={fieldStyle}>
              <form.Field name="department">
                {(field) => (
                  <Select
                    field={field}
                    label="Department"
                    options={Departments}
                    required
                  />
                )}
              </form.Field>
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
