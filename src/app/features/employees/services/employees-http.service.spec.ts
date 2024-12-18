import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { EmployeesHttpService } from './employees-http.service';
import { environment } from '../../../../environments/environment';
import { Employee } from '../models/employee.interface';
import { provideHttpClient } from '@angular/common/http';

describe('EmployeesHttpService', () => {
  let service: EmployeesHttpService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/employees`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeesHttpService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(EmployeesHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch employees with only one query parameter (GET)', () => {
    const mockEmployees: Employee[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Developer' },
    ];

    const params = { position: 'Developer' };  // Single query parameter

    service.getEmployees(params).subscribe((employees) => {
      expect(employees.length).toBe(1);
    });

    const req = httpMock.expectOne(`${apiUrl}?position=Developer`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('position')).toBe('Developer');
    req.flush([mockEmployees[0]]);
  });

  it('should fetch a single employee by ID (GET)', () => {
    const mockEmployee: Employee = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      position: 'Developer',
    };

    service.getEmployee(1).subscribe((employee) => {
      expect(employee).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployee);
  });

  it('should add a new employee (POST)', () => {
    const newEmployee: Employee = {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      position: 'Designer',
    };

    service.addEmployee(newEmployee).subscribe((employee) => {
      expect(employee).toEqual(newEmployee);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(newEmployee);
    req.flush(newEmployee);
  });

  it('should update an existing employee (PUT)', () => {
    const updatedEmployee: Employee = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      position: 'Senior Developer',
    };

    service.updateEmployee(updatedEmployee).subscribe((employee) => {
      expect(employee).toEqual(updatedEmployee);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedEmployee);
  });

  it('should delete an employee (DELETE)', () => {
    service.deleteEmployee(1).subscribe((response) => {
      expect(response).toBeFalsy();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
