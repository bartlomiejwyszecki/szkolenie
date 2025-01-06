import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  template: `
    <mat-toolbar color="primary">
      <a mat-button routerLink="/welcome"><h1>Employee Management App</h1></a>
      <span class="spacer"></span>
      <nav>
        <a mat-button routerLink="/employees">Employees</a>
      </nav>
    </mat-toolbar>
  `,
  styles: `
    .spacer {
      flex: 1 1 auto;
    }

    nav a {
      text-decoration: none;
    }
  `,
})
export class NavigationComponent {}
