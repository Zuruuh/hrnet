import { DatePicker, type DatePickerProps } from '@zuruuh/react-date-picker';
import dayjs from 'dayjs';
import { type FC } from 'react';
import { css } from '../../styled-system/css';
import clsx from 'clsx';

const today = dayjs();

// const dayInViewedMonthButtonStyle = css.raw({
//   backgroundColor: 'white',
//   _hover: {
//     backgroundColor: 'blue.300',
//   },
//   color: 'black',
// });

// const selectedDayButton = css.raw({
//   backgroundColor: 'blue.500',
//   color: 'white',
//   _hover: {
//     backgroundColor: 'blue.700',
//   },
// });

const CustomDatePicker: FC<Omit<DatePickerProps, 'children'>> = (props) => {
  return (
    <table
      className={css({
        height: 'max-content',
      })}
    >
      <DatePicker.Root {...props}>
        {({ setTemporarySelectedDate }) => (
          <>
            {/* <thead> <tr></tr> </thead> */}
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
                              rounded: 'sm',
                              backgroundColor: 'gray.100',
                            }),
                            day.isSelected
                              ? css.raw({
                                  backgroundColor: 'blue.700',
                                  color: 'white',
                                  _hover: {
                                    backgroundColor: 'blue.800',
                                  },
                                })
                              : day.belongsToSelectedMonth
                                ? css.raw({
                                    backgroundColor: 'white',
                                    _hover: { backgroundColor: 'gray.50' },
                                  })
                                : css.raw({
                                    _hover: { backgroundColor: 'gray.200' },
                                  }),
                            day.isToday
                              ? css.raw({ fontWeight: 'bold' })
                              : null,
                          )}
                        >
                          <button
                            type="button"
                            onClick={day.onClick}
                            aria-label={day.alt}
                            disabled={day.isOutOfRange}
                            className={css({
                              width: 'full',
                              height: 'full',
                              cursor: 'pointer',
                            })}
                          >
                            {day.date.date()}
                          </button>
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
  );
};

export { CustomDatePicker as DatePicker };
