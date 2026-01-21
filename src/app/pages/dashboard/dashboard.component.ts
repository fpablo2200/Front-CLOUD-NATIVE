import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TransportApiService } from '../../services/transport-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private api = inject(TransportApiService);

  overview$ = this.api.getOverview();
  vehicles$ = this.api.getVehicles();
  alerts$ = this.api.getAlerts();
  locations$ = this.api.getVehicleLocations$();

  statusBadge(status: string) {
    if (status === 'Retrasado') {
      return 'badge badge-warning';
    }
    if (status === 'Mantenimiento') {
      return 'badge badge-danger';
    }
    return 'badge badge-success';
  }
}
