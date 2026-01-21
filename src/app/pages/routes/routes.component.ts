import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { RouteCreate } from '../../models/transport.models';
import { TransportApiService } from '../../services/transport-api.service';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent {
  private api = inject(TransportApiService);
  private fb = inject(FormBuilder);

  saving = false;
  routes$ = this.api.getRoutes();

  form = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(2)]],
    name: ['', [Validators.required]],
    origin: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    stops: [10, [Validators.required, Validators.min(2), Validators.max(60)]],
    distanceKm: [12, [Validators.required, Validators.min(1), Validators.max(200)]],
    color: ['#1d4ed8', [Validators.required]]
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload = this.form.getRawValue() as RouteCreate;

    this.api
      .createRoute(payload)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {
        this.routes$ = this.api.getRoutes();
        this.form.reset({
          code: '',
          name: '',
          origin: '',
          destination: '',
          stops: 10,
          distanceKm: 12,
          color: '#1d4ed8'
        });
      });
  }

  errorFor(controlName: string) {
    const control = this.form.get(controlName);
    if (!control || !control.touched || !control.errors) {
      return null;
    }
    if (control.errors['required']) {
      return 'Este campo es obligatorio.';
    }
    if (control.errors['min'] || control.errors['max']) {
      return 'Valor fuera de rango.';
    }
    return 'Valor inválido.';
  }
}
