import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TransportApiService } from '../../services/transport-api.service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {
  private api = inject(TransportApiService);

  alertas$ = this.api.obtenerAlertas();
}
