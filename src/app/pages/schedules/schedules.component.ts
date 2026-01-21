import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ScheduleCreate } from '../../models/transport.models';
import { TransportApiService } from '../../services/transport-api.service';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {
  private api = inject(TransportApiService);
  private fb = inject(FormBuilder);

  saving = false;
  schedules$ = this.api.getSchedules();

  form = this.fb.group({
    routeCode: ['', [Validators.required]],
    dayType: ['Laboral', [Validators.required]],
    startTime: ['05:00', [Validators.required]],
    endTime: ['22:30', [Validators.required]],
    frequencyMin: [10, [Validators.required, Validators.min(5), Validators.max(60)]],
    timezone: ['America/Bogota', [Validators.required]],
    notes: ['']
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload = this.form.getRawValue() as ScheduleCreate;

    this.api
      .createSchedule(payload)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe(() => {
        this.schedules$ = this.api.getSchedules();
        this.form.reset({
          routeCode: '',
          dayType: 'Laboral',
          startTime: '05:00',
          endTime: '22:30',
          frequencyMin: 10,
          timezone: 'America/Bogota',
          notes: ''
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
