import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import {
  AddressField,
  BirthDate,
  Date,
  Departments,
  Name,
  Zipcode,
} from '../schemas';
import { useQuery } from '@tanstack/react-query';
import { css } from '../../styled-system/css';
import { ComboBox } from '../components/Form/Select';
import { Input } from '../components/Form/Input';
import { DAYJS_HTML5_FORMAT, DateInput } from '../components/Form/DateInput';
import { z } from 'zod';
import {
  Button,
  Dialog,
  Form,
  Heading,
  Modal,
  ModalOverlay,
} from 'react-aria-components';
import dayjs from 'dayjs';
import { useEmployeesStore } from '../stores/employees.store';

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

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage(): ReactNode {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { add: addEmployee } = useEmployeesStore();

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      department: Departments.Values.Sales,
      birthDate: '',
      startDate: dayjs().format(DAYJS_HTML5_FORMAT),
    },
    onSubmit: ({ value: employee }) => {
      addEmployee({ id: crypto.randomUUID(), ...employee });
      setShowConfirmationModal(true);
    },
    validatorAdapter: zodValidator,
  });

  const { data: states, isSuccess: areStatesLoaded } = useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      return (await import('../data/states')).states;
    },
  });

  const firstNameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    firstNameInputRef.current?.focus();
  }, []);

  const StateValidator = useMemo(
    () =>
      areStatesLoaded
        ? z
            .string()
            .regex(new RegExp(`(${states.join('|')})`), 'Invalid state')
            .transform(
              (state) => states.find((s) => s.name === state)!.abbreviation,
            )
        : undefined,
    [areStatesLoaded, states],
  );

  return (
    <>
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
          <Form
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
                    onChangeAsyncDebounceMs: 500,
                    onSubmit: Name,
                  }}
                >
                  {(field) => (
                    <Input
                      field={field}
                      label="First name"
                      inputRef={firstNameInputRef}
                      autoComplete="given-name"
                      placeholder="John"
                      aria-required
                    />
                  )}
                </form.Field>
              </div>

              <div className={fieldStyle}>
                <form.Field
                  name="lastName"
                  validators={{
                    onChangeAsync: Name,
                    onChangeAsyncDebounceMs: 500,
                    onSubmit: Name,
                  }}
                >
                  {(field) => (
                    <Input
                      field={field}
                      label="Last name"
                      autoComplete="family-name"
                      placeholder="Doe"
                      aria-required
                    />
                  )}
                </form.Field>
              </div>
            </div>

            <div className={fieldLineStyle}>
              <div className={fieldStyle}>
                <form.Field
                  name="birthDate"
                  validators={{
                    onChangeAsync: BirthDate,
                    onChangeAsyncDebounceMs: 500,
                    onSubmit: BirthDate,
                  }}
                >
                  {(field) => (
                    <DateInput
                      field={field}
                      label="Date of Birth"
                      autoComplete="bday"
                      aria-required
                      datePickerOptions={{
                        maximumSelectableDate: dayjs()
                          .subtract(18, 'years')
                          .endOf('month'),
                      }}
                    />
                  )}
                </form.Field>
              </div>

              <div className={fieldStyle}>
                <form.Field
                  name="startDate"
                  validators={{
                    onChangeAsync: Date,
                    onChangeAsyncDebounceMs: 500,
                    onSubmit: Date,
                  }}
                >
                  {(field) => (
                    <DateInput field={field} label="Start Date" aria-required />
                  )}
                </form.Field>
              </div>
            </div>

            <fieldset
              className={css({
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
                    onChangeAsync: AddressField,
                    onChangeAsyncDebounceMs: 500,
                    onSubmit: AddressField,
                  }}
                >
                  {(field) => (
                    <>
                      <Input
                        field={field}
                        label="Street"
                        placeholder="123 Main Street"
                        autoComplete="street-address"
                        aria-required
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
                      onChangeAsync: AddressField,
                      onChangeAsyncDebounceMs: 500,
                      onSubmit: AddressField,
                    }}
                  >
                    {(field) => (
                      <>
                        <Input
                          field={field}
                          label="City"
                          placeholder="San Fransisco"
                          aria-required
                        />
                      </>
                    )}
                  </form.Field>
                </div>
                <div className={fieldStyle}>
                  <form.Field
                    name="state"
                    validators={{
                      onChangeAsync: StateValidator,
                      onChangeAsyncDebounceMs: 500,
                      onSubmit: StateValidator,
                    }}
                  >
                    {(field) => (
                      <>
                        <ComboBox
                          field={field}
                          label="State"
                          placeholder="California"
                          aria-required
                          options={states?.map((state) => state.name) ?? []}
                        />
                      </>
                    )}
                  </form.Field>
                </div>
              </div>

              <div className={fieldStyle}>
                <form.Field
                  name="zipcode"
                  validators={{
                    onChangeAsync: Zipcode,
                    onChangeAsyncDebounceMs: 500,
                    onSubmit: Zipcode,
                  }}
                >
                  {(field) => (
                    <>
                      <Input
                        field={field}
                        label="Zip Code"
                        autoComplete="postal-code"
                        placeholder="93190"
                        type="number"
                        inputMode="numeric"
                        min={10000}
                        max={99999}
                        maxLength={5}
                        aria-required
                        className={css({
                          '&::-webkit-inner-spin-button': {
                            display: 'none',
                            visibility: 'hidden',
                          },
                          '&::-webkit-outer-spin-button': {
                            display: 'none',
                            visibility: 'hidden',
                          },
                        })}
                      />
                    </>
                  )}
                </form.Field>
              </div>

              <div className={fieldStyle}>
                <form.Field
                  name="department"
                  validators={{
                    onChangeAsync: AddressField,
                    onChangeAsyncDebounceMs: 500,
                    onSubmit: AddressField,
                  }}
                >
                  {(field) => (
                    <ComboBox
                      field={field}
                      label="Department"
                      options={Object.values(Departments.Values)}
                      aria-required
                    />
                  )}
                </form.Field>
              </div>
            </fieldset>

            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              })}
            >
              <Button
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
                  cursor: 'pointer',
                  ringOffset: 1,
                  _active: {
                    opacity: 0.9,
                  },
                })}
              >
                Create Employee
              </Button>
            </div>
          </Form>
        </article>
      </section>
      <ModalOverlay
        isOpen={showConfirmationModal}
        onOpenChange={setShowConfirmationModal}
        isDismissable
        className={css({
          position: 'fixed',
          top: 0,
          left: 0,
          width: 'screen',
          height: 'var(--visual-viewport-height)',
          background: 'black/50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,

          '&[data-entering]': {
            animationName: 'modalFade',
            animationDuration: '.2s',
          },
          '&[data-exiting]': {
            animationName: 'modalFade',
            animationDuration: '.15s',
            animationDirection: 'reverse',
            animationTimingFunction: 'ease-in',
          },
        })}
      >
        <Modal
          className={css({
            backgroundColor: 'white',
            padding: 2,
            rounded: 'md',

            '&[data-entering]': {
              animationName: 'modalZoom',
              animationDuration: '.3s',
              animationTimingFunction:
                'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            },
          })}
        >
          <Dialog
            aria-modal
            role="alertdialog"
            className={css({
              outline: 'none',
            })}
          >
            {({ close }) => (
              <>
                <Heading
                  slot="title"
                  className={css({
                    fontSize: 'lg',
                    fontWeight: 'medium',
                  })}
                >
                  Success
                </Heading>
                <p>
                  <span>Employee </span>
                  <span>{`${form.state.values.firstName} ${form.state.values.lastName} `}</span>
                  <span>has been created!</span>
                </p>
                <footer
                  className={css({
                    padding: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 2,
                  })}
                >
                  <Link
                    className={css({ textDecoration: 'underline' })}
                    to="/employees"
                    search={{ query: '', perPage: 10, page: 1 }}
                  >
                    See
                  </Link>
                  <Button
                    className={css({
                      borderWidth: 1,
                      borderColor: 'gray.500',
                      padding: 1,
                      rounded: 'sm',
                    })}
                    onPress={close}
                  >
                    Close
                  </Button>
                </footer>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
}
