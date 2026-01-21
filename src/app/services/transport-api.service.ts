import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, switchMap, timer } from 'rxjs';
import { API_CONFIG } from './api.config';
import {
  Alert,
  DashboardOverview,
  Route,
  RouteCreate,
  Schedule,
  ScheduleCreate,
  Vehicle,
  VehicleCreate,
  VehicleLocation
} from '../models/transport.models';

const MOCK_OVERVIEW: DashboardOverview = {
  activeVehicles: 128,
  delayedVehicles: 9,
  onTimeRate: 92,
  passengersToday: 48210,
  incidentsOpen: 4,
  lastSync: new Date().toISOString()
};

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'V-1021',
    code: 'BUS-21',
    plate: 'TR-5210',
    model: 'Volare W9',
    route: 'Norte Centro',
    driver: 'Valeria Soto',
    status: 'En ruta',
    occupancy: 64,
    lastReport: 'Hace 2 min'
  },
  {
    id: 'V-2042',
    code: 'BUS-77',
    plate: 'TR-8821',
    model: 'Marcopolo Senior',
    route: 'Industrial Sur',
    driver: 'Mario Díaz',
    status: 'Retrasado',
    occupancy: 78,
    lastReport: 'Hace 6 min'
  },
  {
    id: 'V-3099',
    code: 'BUS-13',
    plate: 'TR-1098',
    model: 'Scania Citywide',
    route: 'Aeropuerto',
    driver: 'Camila Reyes',
    status: 'En terminal',
    occupancy: 12,
    lastReport: 'Hace 1 min'
  }
];

const MOCK_ROUTES: Route[] = [
  {
    id: 'R-01',
    code: 'R-NC',
    name: 'Norte Centro',
    origin: 'Terminal Norte',
    destination: 'Centro Histórico',
    stops: 18,
    distanceKm: 22.4,
    color: '#1d4ed8'
  },
  {
    id: 'R-07',
    code: 'R-IS',
    name: 'Industrial Sur',
    origin: 'Zona Industrial',
    destination: 'Estación Sur',
    stops: 14,
    distanceKm: 17.1,
    color: '#14b8a6'
  }
];

const MOCK_SCHEDULES: Schedule[] = [
  {
    id: 'H-101',
    routeCode: 'R-NC',
    dayType: 'Laboral',
    startTime: '05:00',
    endTime: '22:30',
    frequencyMin: 10,
    timezone: 'America/Bogota',
    notes: 'Refuerzo en hora pico'
  },
  {
    id: 'H-220',
    routeCode: 'R-IS',
    dayType: 'Sábado',
    startTime: '06:00',
    endTime: '21:00',
    frequencyMin: 15,
    timezone: 'America/Bogota'
  }
];

const MOCK_ALERTS: Alert[] = [
  {
    id: 'A-01',
    type: 'Incidencia',
    title: 'Bloqueo vial en Av. Central',
    description: 'Se detecta congestión severa por obras. Recalcular rutas.',
    severity: 'Alta',
    createdAt: 'Hace 8 min'
  },
  {
    id: 'A-07',
    type: 'Clima',
    title: 'Lluvias intensas',
    description: 'Reducir velocidad en corredores Norte y Oeste.',
    severity: 'Media',
    createdAt: 'Hace 22 min'
  }
];

const MOCK_LOCATIONS: VehicleLocation[] = [
  { id: 'V-1021', lat: 4.653, lng: -74.083, updatedAt: new Date().toISOString() },
  { id: 'V-2042', lat: 4.62, lng: -74.12, updatedAt: new Date().toISOString() },
  { id: 'V-3099', lat: 4.69, lng: -74.05, updatedAt: new Date().toISOString() }
];

@Injectable({ providedIn: 'root' })
export class TransportApiService {
  constructor(private http: HttpClient) {}

  getOverview() {
    return this.http
      .get<DashboardOverview>(`${API_CONFIG.baseUrl}/overview`)
      .pipe(catchError(() => of(MOCK_OVERVIEW)));
  }

  getVehicles() {
    return this.http
      .get<Vehicle[]>(API_CONFIG.vehiclesUrl)
      .pipe(catchError(() => of(MOCK_VEHICLES)));
  }

  createVehicle(payload: VehicleCreate) {
    return this.http
      .post<Vehicle>(API_CONFIG.vehiclesUrl, payload)
      .pipe(catchError(() => of({
        ...payload,
        id: `V-${Math.floor(Math.random() * 9000) + 1000}`,
        occupancy: 0,
        lastReport: 'Hace 1 min'
      } as Vehicle)));
  }

  getRoutes() {
    return this.http
      .get<Route[]>(API_CONFIG.routesUrl)
      .pipe(catchError(() => of(MOCK_ROUTES)));
  }

  createRoute(payload: RouteCreate) {
    return this.http
      .post<Route>(API_CONFIG.routesUrl, payload)
      .pipe(catchError(() => of({
        ...payload,
        id: `R-${Math.floor(Math.random() * 90) + 10}`
      } as Route)));
  }

  getSchedules() {
    return this.http
      .get<Schedule[]>(API_CONFIG.schedulesUrl)
      .pipe(catchError(() => of(MOCK_SCHEDULES)));
  }

  createSchedule(payload: ScheduleCreate) {
    return this.http
      .post<Schedule>(API_CONFIG.schedulesUrl, payload)
      .pipe(catchError(() => of({
        ...payload,
        id: `H-${Math.floor(Math.random() * 900) + 100}`
      } as Schedule)));
  }

  getAlerts() {
    return this.http
      .get<Alert[]>(API_CONFIG.alertsUrl)
      .pipe(catchError(() => of(MOCK_ALERTS)));
  }

  getVehicleLocations$() {
    return timer(0, 15000).pipe(
      switchMap(() =>
        this.http
          .get<VehicleLocation[]>(`${API_CONFIG.realtimeUrl}/locations`)
          .pipe(catchError(() => of(MOCK_LOCATIONS)))
      )
    );
  }
}
