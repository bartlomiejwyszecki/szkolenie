import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Employee } from '../models/employee.interface';
import { EmployeesHttpParams } from '../models/employees-http-params.type';

@Injectable()
export class EmployeesHttpService {
  private apiUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) {}

  getEmployees(params: EmployeesHttpParams): Observable<Employee[]> {
    let httpParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      httpParams = httpParams.set(key, `${params[key as keyof Employee]!}`);
    });

    return this.http.get<Employee[]>(this.apiUrl, { params: httpParams });
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
