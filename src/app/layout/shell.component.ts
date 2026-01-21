import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent implements OnInit {
  constructor(private msalService: MsalService) {}

  ngOnInit(): void {
    const currentAccount = this.msalService.instance.getActiveAccount();
    if (!currentAccount) {
      const accounts = this.msalService.instance.getAllAccounts();
      if (accounts.length > 0) {
        this.msalService.instance.setActiveAccount(accounts[0]);
      }
    }
  }

  get userName(): string {
    return this.msalService.instance.getActiveAccount()?.name ?? 'Operador';
  }

  logout() {
    this.msalService.logoutRedirect();
  }
}
