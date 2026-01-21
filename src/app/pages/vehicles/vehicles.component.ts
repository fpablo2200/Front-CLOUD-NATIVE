import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransportApiService } from '../../services/transport-api.service';
import { VehicleCreate } from '../../models/transport.models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  private api = inject(TransportApiService);
  private fb = inject(FormBuilder);

  saving = false;
  vehicles$ = this.api.getVehicles();

  form = this.fb.group({
    plate: ['', [Validators.required, Validators.pattern(/^[A-Z]{2,3}-\d{3,4}$/)]],
    code: ['', [Validators.required, Validators.minLength(3)]],
    model: ['', [Validators.required]],
    capacity: [40, [Validators.required, Validators.min(5), Validators.max(200)]],
    route: ['', [Validators.required]],
    driver: ['', [Validators.required]],
    status: ['En ruta', Validators.required]
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload = this.form.getRawValue() as VehicleCreate;

    this.api
      .createVehicle(payload)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {
        this.vehicles$ = this.api.getVehicles();
        this.form.reset({
          plate: '',
          code: '',
          model: '',
          capacity: 40,
          route: '',
          driver: '',
          status: 'En ruta'
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
    if (control.errors['pattern']) {
      return 'Formato inválido. Ej: ABC-1234.';
    }
    if (control.errors['minlength']) {
      return 'Demasiado corto.';
    }
    if (control.errors['min'] || control.errors['max']) {
      return 'Valor fuera de rango.';
    }
    return 'Valor inválido.';
  }
}
