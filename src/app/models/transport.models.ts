export interface DashboardOverview {
  activeVehicles: number;
  delayedVehicles: number;
  onTimeRate: number;
  passengersToday: number;
  incidentsOpen: number;
  lastSync: string;
}

export interface Vehicle {
  id: string;
  code: string;
  plate: string;
  model: string;
  route: string;
  driver: string;
  status: 'En ruta' | 'En terminal' | 'Retrasado' | 'Mantenimiento';
  occupancy: number;
  lastReport: string;
}

export interface VehicleLocation {
  id: string;
  lat: number;
  lng: number;
  updatedAt: string;
}

export interface Route {
  id: string;
  code: string;
  name: string;
  origin: string;
  destination: string;
  stops: number;
  distanceKm: number;
  color: string;
}

export interface Schedule {
  id: string;
  routeCode: string;
  dayType: 'Laboral' | 'Sábado' | 'Domingo' | 'Festivo';
  startTime: string;
  endTime: string;
  frequencyMin: number;
  timezone: string;
  notes?: string;
}

export interface Alert {
  id: string;
  type: 'Incidencia' | 'Servicio' | 'Clima' | 'Seguridad';
  title: string;
  description: string;
  severity: 'Alta' | 'Media' | 'Baja';
  createdAt: string;
}

export interface VehicleCreate {
  plate: string;
  code: string;
  model: string;
  capacity: number;
  route: string;
  driver: string;
  status: Vehicle['status'];
}

export interface RouteCreate {
  code: string;
  name: string;
  origin: string;
  destination: string;
  stops: number;
  distanceKm: number;
  color: string;
}

export interface ScheduleCreate {
  routeCode: string;
  dayType: Schedule['dayType'];
  startTime: string;
  endTime: string;
  frequencyMin: number;
  timezone: string;
  notes?: string;
}
