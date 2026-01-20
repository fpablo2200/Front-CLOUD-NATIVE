import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular B2C Demo</h1>
    <button (click)="login()">Login</button>
    <button (click)="logout()">Logout</button>
  `,
})
export class AppComponent {
  constructor(private msalService: MsalService) {}

  login() {
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logoutRedirect();
  }
}
