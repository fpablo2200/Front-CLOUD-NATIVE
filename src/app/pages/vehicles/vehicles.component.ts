import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransportApiService } from '../../services/transport-api.service';
import { CrearVehiculo } from '../../models/transport.models';
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

  guardando = false;
  vehiculos$ = this.api.obtenerVehiculos();

  formulario = this.fb.group({
    placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{2,3}-\d{3,4}$/)]],
    codigo: ['', [Validators.required, Validators.minLength(3)]],
    modelo: ['', [Validators.required]],
    capacidad: [40, [Validators.required, Validators.min(5), Validators.max(200)]],
    ruta: ['', [Validators.required]],
    conductor: ['', [Validators.required]],
    estado: ['En ruta', Validators.required]
  });

  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const datos = this.formulario.getRawValue() as CrearVehiculo;

    this.api
      .crearVehiculo(datos)
      .pipe(finalize(() => (this.guardando = false)))
      .subscribe(() => {
        this.vehiculos$ = this.api.obtenerVehiculos();
        this.formulario.reset({
          placa: '',
          codigo: '',
          modelo: '',
          capacidad: 40,
          ruta: '',
          conductor: '',
          estado: 'En ruta'
        });
      });
  }

  errorPara(nombreControl: string) {
    const control = this.formulario.get(nombreControl);
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
