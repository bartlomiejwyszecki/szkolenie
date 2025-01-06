// import { signalStore, withState, withMethods } from '@ngrx/signals';
// import { inject } from '@angular/core';
// import { Employee } from './models/employee.interface';
// import { EmployeesHttpService } from './services/employees-http.service';

// export const EmployeeStore = signalStore(
//   withState<{ employees: Employee[]; loading: boolean }>({
//     employees: [],
//     loading: false
//   }),
//   withMethods((store, employeeService = inject(EmployeesHttpService)) => {
//     return {
//       loadEmployees: async (queryParams = {}) => {
//         store.setLoading(true);
//         const employees = await employeeService.getEmployees(queryParams).toPromise();
//         store.setEmployees(employees);
//         store.setLoading(false);
//       },
//       addEmployee: (employee: Employee) => {
//         store.patchState({ employees: [...store.state.employees, employee] });
//       },
//       removeEmployee: (employeeId: number) => {
//         store.patchState({
//           employees: store.state.employees.filter(e => e.id !== employeeId)
//         });
//       }
//     };
//   })
// );
