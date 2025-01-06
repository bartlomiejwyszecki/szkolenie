import { inject, Pipe, PipeTransform } from '@angular/core';
import { EmployeesTableColumnName } from '../models/employees-table-column-name.type';
import { TitleCasePipe } from '@angular/common';

export const EMPLOYEE_PROP_LABEL_MAP = new Map<EmployeesTableColumnName, string>([
  ['name', 'Full Name'],
  ['email', 'Email Address'],
]);

@Pipe({
  name: 'employeesTableColumnLabel',
  standalone: true,
})
export class EmployeesTableColumnLabelPipe implements PipeTransform {
  private readonly titleCasePipe = inject(TitleCasePipe);

  transform(key: EmployeesTableColumnName): string {
    const matchingKey = EMPLOYEE_PROP_LABEL_MAP.get(key);

    return matchingKey ? matchingKey : this.titleCasePipe.transform(key);
  }
}
