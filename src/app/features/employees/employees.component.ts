import { Component, inject, signal, ViewChild } from '@angular/core';
import { Employee } from './models/employee.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { EmployeesHttpService } from './services/employees-http.service';
import { EmployeesHttpParams } from './models/employees-http-params.type';
import { CommonModule } from '@angular/common';
import { EmployeesTableColumnName } from './models/employees-table-column-name.type';
import { EmployeesTableColumnLabelPipe } from './pipes/employees-table-column-label.pipe';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    EmployeesTableColumnLabelPipe,
  ],
  providers: [EmployeesHttpService],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  displayColumns: EmployeesTableColumnName[] = ['name', 'position', 'email'];

  items = signal<Employee[]>([]);
  isLoading = signal(false);

  private employeesHttp = inject(EmployeesHttpService);

  constructor() {} // private columnService: ColumnService // Inject the ColumnService

  ngOnInit(): void {
    this.getEmployees({});
  }

  getEmployees(params: EmployeesHttpParams): void {
    this.isLoading.set(true);

    this.employeesHttp.getEmployees(params).subscribe({
      complete: () => this.isLoading.set(false),
      next: (employees) => this.items.update(() => employees),
    });
  }

  setTableColumns(): void {
    // Get column definitions from the ColumnService
    // const columns = this.columnService.getColumnDefinitions();
    // this.displayedColumns = columns.map((column) => column.columnDef);
  }
}
