import { createFileRoute } from '@tanstack/react-router';
import { type ReactNode, useMemo, useState, type FC } from 'react';
import { useEmployeesStore } from '../stores/employees.store';
import {
  Cell,
  type CellProps,
  Column,
  type ColumnProps,
  ColumnResizer,
  Group,
  ResizableTableContainer,
  Row,
  type SortDescriptor,
  Table,
  TableBody,
  TableHeader,
  Select,
  Label,
  Button,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
  Input,
  TextField,
} from 'react-aria-components';
import { css } from '../../styled-system/css';
import * as R from 'remeda';
import { Departments, type Employee } from '../schemas';
import { z } from 'zod';
import { listBoxItemStyle, popoverStyle } from '../components/Form/Select';
import * as faker from '@ngneat/falso';
import dayjs from 'dayjs';
import { DAYJS_HTML5_FORMAT } from '../components/Form/DateInput';

const paginationButtonStyle = css({
  textDecoration: 'underline',
  padding: 2,
  rounded: 'sm',
  cursor: 'pointer',
  backgroundColor: 'gray.200',
  _disabled: { color: 'gray.500', cursor: 'not-allowed' },
});

export const Route = createFileRoute('/employees')({
  component: EmployeePage,
  validateSearch: z.object({
    page: z.number().positive().int().optional().catch(1),
    perPage: z
      .union([z.literal(10), z.literal(25), z.literal(50), z.literal(100)])
      .optional()
      .catch(10),
    query: z.string().optional().catch(''),
  }),
});

function EmployeePage(): ReactNode {
  const { employees, add: addEmployee } = useEmployeesStore();
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'firstName',
    direction: 'ascending',
  });

  const navigate = Route.useNavigate();
  const { query = '', perPage = 10, page = 1 } = Route.useSearch();

  // very basic search impl but it works I guess
  // also could be optimized
  const filteredEmployees = useMemo(
    () =>
      query?.trim() === ''
        ? employees
        : employees.filter((employee) =>
            Object.values(employee).some((value) =>
              value.toString().toLowerCase().includes(query.toLowerCase()),
            ),
          ),
    [employees, query],
  );

  const employeesCount = filteredEmployees.length;

  const sortedEmployees = useMemo(() => {
    const sorted = sortDescriptor.column
      ? R.sortBy(
          filteredEmployees,
          (employee) => employee[sortDescriptor.column as keyof Employee],
        )
      : filteredEmployees;

    return sortDescriptor.direction === 'ascending' ? sorted : sorted.reverse();
  }, [sortDescriptor.column, sortDescriptor.direction, filteredEmployees]);

  const displayedEmployees = useMemo(
    () => sortedEmployees.slice(perPage * (page - 1), perPage * page),
    [sortedEmployees, page, perPage],
  );

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
        })}
      >
        Current Employees
      </h1>
      <div
        className={css({
          width: 'max-content',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        })}
      >
        <header
          aria-label="Controls"
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: 'full',
            paddingX: 2,
            paddingY: 4,
          })}
        >
          <Select
            defaultSelectedKey={perPage.toString()}
            onSelectionChange={(newPerPage) =>
              navigate({
                search: {
                  query,
                  page: Math.floor(
                    (perPage * page - perPage) / Number(newPerPage),
                  ),
                  perPage: Number(newPerPage),
                },
              })
            }
          >
            <Label className={css({ marginRight: 2 })}>Shown entries:</Label>
            <Button className={css({ cursor: 'pointer' })}>
              <SelectValue />
              <span aria-hidden="true">{'▼'}</span>
            </Button>
            <Popover className={popoverStyle}>
              <ListBox>
                {[10, 25, 50, 100].map((value) => (
                  <ListBoxItem
                    id={value.toString()}
                    textValue={value.toString()}
                    key={value.toString()}
                    className={listBoxItemStyle}
                  >
                    {value}
                  </ListBoxItem>
                ))}
              </ListBox>
            </Popover>
          </Select>
          <TextField
            className={css({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            })}
            defaultValue={query}
          >
            <Label>Search</Label>
            <Input
              onChange={(e) =>
                navigate({
                  search: {
                    perPage,
                    page: 1,
                    query: e.target.value,
                  },
                })
              }
            />
          </TextField>
          <Group
            className={css({ display: 'flex', alignItems: 'center', gap: 1 })}
          >
            <Button
              onPress={() =>
                navigate({
                  search: {
                    perPage,
                    query,
                    page: page - 1,
                  },
                })
              }
              isDisabled={page === 1}
              className={paginationButtonStyle}
            >
              Previous
            </Button>
            <span className={css({ paddingX: 1 })}>{page}</span>
            <Button
              onPress={() =>
                navigate({
                  search: {
                    perPage,
                    query,
                    page: page + 1,
                  },
                })
              }
              isDisabled={
                employeesCount <= perPage
                  ? true
                  : page === Math.ceil(employeesCount / perPage)
              }
              className={paginationButtonStyle}
            >
              Next
            </Button>
          </Group>
        </header>
        <ResizableTableContainer
          className={css({
            overflow: 'auto',
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
              <CustomColumn
                id="firstName"
                allowsSorting
                isRowHeader
                defaultWidth={140}
              >
                First Name
              </CustomColumn>
              <CustomColumn
                id="lastName"
                allowsSorting
                isRowHeader
                defaultWidth={140}
              >
                Last Name
              </CustomColumn>
              <CustomColumn
                id="startDate"
                allowsSorting
                isRowHeader
                defaultWidth={140}
              >
                Start date
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
              <CustomColumn
                id="city"
                allowsSorting
                isRowHeader
                defaultWidth={90}
              >
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
            <TableBody items={displayedEmployees}>
              {(employee) => (
                <Row
                  className={css({
                    cursor: 'default',
                    outline: 'none',
                    _focusVisible: {
                      outlineWidth: 2,
                      outlineColor: 'slate.600',
                      outlineOffset: 4,
                    },
                    _even: { backgroundColor: 'slate.100' },
                  })}
                  key={employee.id}
                >
                  <CustomCell key="firstName">{employee.firstName}</CustomCell>
                  <CustomCell key="lastName">{employee.lastName}</CustomCell>
                  <CustomCell key="startDate">{employee.startDate}</CustomCell>
                  <CustomCell key="department">
                    {employee.department}
                  </CustomCell>
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
        <Button
          className={css({
            backgroundColor: 'black',
            color: 'white',
            padding: 2,
            marginTop: 3,
            width: 'fit-content',
            marginX: 'auto',
            rounded: 'sm',
            cursor: 'pointer',
            ringColor: 'slate.500',
            fontSize: 'lg',
          })}
          onPress={() =>
            addEmployee({
              id: faker.randUuid(),
              firstName: faker.randFirstName(),
              lastName: faker.randLastName(),
              city: faker.randCity(),
              state: faker.randState(),
              street: faker.randStreetName(),
              zipcode: faker.randZipCode(),
              birthDate: dayjs(faker.randPastDate()).format(DAYJS_HTML5_FORMAT),
              startDate: dayjs(faker.randRecentDate()).format(
                DAYJS_HTML5_FORMAT,
              ),
              department: faker.rand(Object.values(Departments.Values)),
            })
          }
        >
          Create mock employee
        </Button>
      </div>
    </section>
  );
}

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
            role="button"
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
