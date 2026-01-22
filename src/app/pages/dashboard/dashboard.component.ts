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

  resumen$ = this.api.obtenerResumen();
  vehiculos$ = this.api.obtenerVehiculos();
  alertas$ = this.api.obtenerAlertas();
  ubicaciones$ = this.api.obtenerUbicacionesVehiculos$();

  estadoBadge(estado: string) {
    if (estado === 'Retrasado') {
      return 'badge badge-warning';
    }
    if (estado === 'Mantenimiento') {
      return 'badge badge-danger';
    }
    return 'badge badge-success';
  }
}
