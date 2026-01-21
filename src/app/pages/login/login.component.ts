import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private msalService: MsalService) {}

  login() {
    this.msalService.loginRedirect();
  }
}
