import { createFileRoute } from '@tanstack/react-router';
import { ReactNode, useMemo, useState, type FC } from 'react';
import { useEmployeesStore } from '../stores/employees.store';
import {
  Cell,
  CellProps,
  Column,
  ColumnProps,
  ColumnResizer,
  Group,
  ResizableTableContainer,
  Row,
  SortDescriptor,
  Table,
  TableBody,
  TableHeader,
} from 'react-aria-components';
import { css } from '../../styled-system/css';
import * as R from 'remeda';
import { Employee } from '../schemas';

const EmployeePage: FC = () => {
  const { employees } = useEmployeesStore();
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'firstName',
    direction: 'ascending',
  });

  const sortedEmployees = useMemo(() => {
    const sorted = sortDescriptor.column
      ? R.sortBy(
          employees,
          (employee) => employee[sortDescriptor.column as keyof Employee],
        )
      : employees;

    return sortDescriptor.direction === 'ascending' ? sorted : sorted.reverse();
  }, [sortDescriptor.column, sortDescriptor.direction, employees]);

  return (
    <section
      className={css({
        width: 'full',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
      })}
    >
      <h1
        className={css({
          fontSize: '2xl',
          fontWeight: 'medium',
          marginBottom: 2,
        })}
      >
        Current Employees
      </h1>
      <ResizableTableContainer
        className={css({
          overflow: 'auto',
          maxHeight: '80vh',
          scrollPaddingTop: 4,
          position: 'relative',
          backgroundColor: 'white',
          rounded: 'lg',
          shadow: 'sm',
          color: 'gray.600',
        })}
      >
        <Table
          aria-label="Current Employees"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          selectionMode="none"
          className={css({
            borderCollapse: 'separate',
            borderSpacing: 0,
          })}
        >
          <TableHeader>
            <CustomColumn id="firstName" allowsSorting isRowHeader>
              First Name
            </CustomColumn>
            <CustomColumn id="lastName" allowsSorting isRowHeader>
              Last Name
            </CustomColumn>
            <CustomColumn id="department" allowsSorting isRowHeader>
              Department
            </CustomColumn>
            <CustomColumn
              id="birthDate"
              allowsSorting
              isRowHeader
              defaultWidth={160}
            >
              Date of birth
            </CustomColumn>
            <CustomColumn
              id="street"
              allowsSorting
              isRowHeader
              defaultWidth={110}
            >
              Street
            </CustomColumn>
            <CustomColumn id="city" allowsSorting isRowHeader defaultWidth={90}>
              City
            </CustomColumn>
            <CustomColumn
              id="state"
              allowsSorting
              isRowHeader
              defaultWidth={110}
            >
              State
            </CustomColumn>
            <CustomColumn
              id="zipcode"
              allowsSorting
              isRowHeader
              defaultWidth={120}
            >
              Zipcode
            </CustomColumn>
          </TableHeader>
          <TableBody items={sortedEmployees}>
            {(employee) => (
              <Row
                className={css({
                  cursor: 'default',
                  outline: 'none',
                  _focusVisible: {
                    outlineWidth: 2,
                    outlineColor: 'slate.600',
                    outlineOffset: -4,
                  },
                  _even: { backgroundColor: 'slate.100' },
                })}
                key={employee.id}
              >
                <CustomCell key="firstName">{employee.firstName}</CustomCell>
                <CustomCell key="lastName">{employee.lastName}</CustomCell>
                <CustomCell key="department">{employee.department}</CustomCell>
                <CustomCell key="birthDate">{employee.birthDate}</CustomCell>
                <CustomCell key="street">{employee.street}</CustomCell>
                <CustomCell key="city">{employee.city}</CustomCell>
                <CustomCell key="state">{employee.state}</CustomCell>
                <CustomCell key="zipcode">{employee.zipcode}</CustomCell>
              </Row>
            )}
          </TableBody>
        </Table>
      </ResizableTableContainer>
    </section>
  );
};

const CustomCell: FC<CellProps> = (props) => (
  <Cell
    className={css({
      paddingX: 4,
      paddingY: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',

      _focusVisible: {
        outlineWidth: 2,
        outlineColor: 'slate.600',
        outlineOffset: -4,
      },
    })}
    {...props}
  />
);

const CustomColumn: FC<ColumnProps & { children: ReactNode }> = ({
  defaultWidth = 150,
  ...props
}) => (
  <Column
    defaultWidth={defaultWidth}
    className={css({
      position: 'sticky',
      top: 0,
      padding: 0,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: 'slate.300',
      backgroundColor: 'slate.200',
      fontWeight: 'bold',
      textAlign: 'left',
      cursor: 'default',
      whiteSpace: 'nowrap',
      outline: 'none',
      _first: {
        roundedTopLeft: 'lg',
      },
      _last: { roundedTopRight: 'lg' },
    })}
    {...props}
  >
    {({ allowsSorting, sortDirection }) => (
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 4,
          paddingY: 1,
        })}
      >
        <Group
          role="presentation"
          tabIndex={-1}
          className={css({
            display: 'flex',
            flex: '1 1 0%',
            alignItems: 'center',
            overflow: 'hidden',
            outline: 'none',
            rounded: 'sm',
            _focusVisible: { ringWidth: 2, ringColor: 'slate.600' },
          })}
        >
          <span
            className={css({
              flex: '1 1 0%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            })}
          >
            {props.children}
          </span>
          {allowsSorting && sortDirection ? (
            <span
              data-sort-descending={sortDirection === 'descending'}
              className={css({
                marginLeft: 1,
                width: 4,
                height: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transitionProperty: 'transform',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '.15s',
                transform: 'rotate(0deg)',

                '&[data-sort-descending="true"]': {
                  transform: 'rotate(180deg)',
                },
              })}
            >
              {'▲'}
            </span>
          ) : (
            <></>
          )}
        </Group>
        <ColumnResizer
          className={css({
            width: '2px',
            paddingX: '8px',
            paddingY: 1,
            height: 5,
            boxSizing: 'initial',
            backgroundClip: 'content-box',
            backgroundColor: 'slate.400',
            cursor: 'col-resize',
            rounded: 'sm',

            '&[data-resizing]': {
              backgroundColor: 'slate.800',
              width: '3px',
              paddingLeft: '7px',
            },

            _focusVisible: {
              ringWidth: 2,
              ringColor: 'slate.600',
              ring: 'inset',
            },
          })}
        />
      </div>
    )}
  </Column>
);

export const Route = createFileRoute('/employees')({
  component: EmployeePage,
});
