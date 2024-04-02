import { DatePicker, type DatePickerProps } from '@zuruuh/react-date-picker';
import type { FC } from 'react';
import { css } from '../../styled-system/css';
import { Button, Dialog } from 'react-aria-components';

type CustomDatePickerProps = Omit<DatePickerProps, 'children'>;

const controlStyle = css({
  '&[data-disabled]': {
    cursor: 'not-allowed',
  },
});

const CustomDatePicker: FC<CustomDatePickerProps> = (props) => {
  return (
    <Dialog
      className={css({
        backgroundColor: 'white',
        rounded: 'sm',
        borderColor: 'black',
        borderWidth: 1,
        padding: 1,
      })}
    >
      <table
        className={css({
          height: 'max-content',
        })}
      >
        <DatePicker.Root {...props}>
          {({ temporarySelectedDate, controls }) => (
            <>
              <thead>
                <tr
                  className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                  })}
                >
                  <th>
                    <Button
                      isDisabled={controls.prevMonth.disabled}
                      onPress={controls.prevMonth.execute}
                      className={controlStyle}
                    >
                      {'◀'}
                    </Button>
                  </th>
                  <th>
                    {temporarySelectedDate.format('MMMM')}{' '}
                    {temporarySelectedDate.format('YYYY')}
                  </th>
                  <th>
                    <Button
                      isDisabled={controls.nextMonth.disabled}
                      onPress={controls.nextMonth.execute}
                      className={controlStyle}
                    >
                      {'▶'}
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody
                className={css({
                  gap: 1,
                  display: 'flex',
                  flexDirection: 'column',
                })}
              >
                <DatePicker.Calendar>
                  <tr className={css({ display: 'flex', gap: 1 })}>
                    <DatePicker.Week>
                      <DatePicker.Day>
                        {(day) => (
                          <td
                            className={css(
                              css.raw({
                                textAlign: 'center',
                                width: 8,
                                height: 8,
                              }),
                            )}
                          >
                            <Button
                              type="button"
                              onPress={day.onClick}
                              aria-label={day.alt}
                              isDisabled={day.isOutOfRange}
                              className={css(
                                {
                                  width: 'full',
                                  height: 'full',
                                  cursor: 'pointer',
                                  rounded: 'sm',
                                },

                                day.isSelected
                                  ? css.raw({
                                      backgroundColor: 'blue.700',
                                      color: 'white',
                                      _hover: {
                                        backgroundColor: 'blue.800',
                                      },
                                      _focus: {
                                        backgroundColor: 'blue.800',
                                      },
                                    })
                                  : day.belongsToSelectedMonth
                                    ? null
                                    : css.raw({
                                        color: 'gray.400',
                                      }),
                                day.isSelected
                                  ? null
                                  : css.raw({
                                      _hover: {
                                        backgroundColor: 'gray.200',
                                      },
                                      _focus: {
                                        backgroundColor: 'gray.200',
                                      },
                                    }),
                                day.isToday
                                  ? css.raw({ fontWeight: 'bold' })
                                  : null,

                                day.isOutOfRange
                                  ? css.raw({
                                      cursor: 'not-allowed',
                                      color: 'gray.300',
                                    })
                                  : null,
                              )}
                            >
                              {day.date.date()}
                            </Button>
                          </td>
                        )}
                      </DatePicker.Day>
                    </DatePicker.Week>
                  </tr>
                </DatePicker.Calendar>
              </tbody>
            </>
          )}
        </DatePicker.Root>
      </table>
    </Dialog>
  );
};

export {
  CustomDatePicker as DatePicker,
  type CustomDatePickerProps as DatePickerProps,
};
