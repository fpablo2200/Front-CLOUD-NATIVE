// Interfaces para Dashboard y Resumen General
export interface ResumenDashboard {
  vehiculosActivos: number;
  vehiculosRetrasados: number;
  tasaPuntualidad: number;
  pasajerosHoy: number;
  incidenciasAbiertas: number;
  ultimaSincronizacion: string;
}

// Interfaces para Vehículos
export interface Vehiculo {
  id: string;
  codigo: string;
  placa: string;
  modelo: string;
  ruta: string;
  conductor: string;
  estado: 'En ruta' | 'En terminal' | 'Retrasado' | 'Mantenimiento';
  ocupacion: number;
  ultimoReporte: string;
}

export interface UbicacionVehiculo {
  id: string;
  latitud: number;
  longitud: number;
  actualizadoEn: string;
}

export interface CrearVehiculo {
  placa: string;
  codigo: string;
  modelo: string;
  capacidad: number;
  ruta: string;
  conductor: string;
  estado: Vehiculo['estado'];
}

// Interfaces para Rutas
export interface Ruta {
  id: string;
  codigo: string;
  nombre: string;
  origen: string;
  destino: string;
  paradas: number;
  distanciaKm: number;
  color: string;
}

export interface CrearRuta {
  codigo: string;
  nombre: string;
  origen: string;
  destino: string;
  paradas: number;
  distanciaKm: number;
  color: string;
}

// Interfaces para Asignación (Horarios)
export interface Horario {
  id: string;
  codigoRuta: string;
  tipoDia: 'Laboral' | 'Sábado' | 'Domingo' | 'Festivo';
  horaInicio: string;
  horaFin: string;
  frecuenciaMin: number;
  zonaHoraria: string;
  notas?: string;
}

export interface CrearHorario {
  codigoRuta: string;
  tipoDia: Horario['tipoDia'];
  horaInicio: string;
  horaFin: string;
  frecuenciaMin: number;
  zonaHoraria: string;
  notas?: string;
}

// Interfaces para Asignación (Alertas)
export interface Alerta {
  id: string;
  tipo: 'Incidencia' | 'Servicio' | 'Clima' | 'Seguridad';
  titulo: string;
  descripcion: string;
  severidad: 'Alta' | 'Media' | 'Baja';
  creadoEn: string;
}

// Tipos legacy para compatibilidad (deprecados)
/** @deprecated Usar ResumenDashboard */
export type DashboardOverview = ResumenDashboard;
/** @deprecated Usar Vehiculo */
export type Vehicle = Vehiculo;
/** @deprecated Usar UbicacionVehiculo */
export type VehicleLocation = UbicacionVehiculo;
/** @deprecated Usar CrearVehiculo */
export type VehicleCreate = CrearVehiculo;
/** @deprecated Usar Ruta */
export type Route = Ruta;
/** @deprecated Usar CrearRuta */
export type RouteCreate = CrearRuta;
/** @deprecated Usar Horario */
export type Schedule = Horario;
/** @deprecated Usar CrearHorario */
export type ScheduleCreate = CrearHorario;
/** @deprecated Usar Alerta */
export type Alert = Alerta;
