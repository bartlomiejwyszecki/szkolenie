import { TitleCasePipe } from '@angular/common';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('./features/welcome/welcome.component').then(
        (c) => c.WelcomeComponent
      ),
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./features/employees/employees.component').then(
        (c) => c.EmployeesComponent
      ),
    providers: [TitleCasePipe],
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
];
