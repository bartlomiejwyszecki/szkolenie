import { Employee } from './employee.interface';

export type EmployeesTableColumnName = keyof Omit<Employee, 'id'>;
