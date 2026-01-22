import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, switchMap, timer } from 'rxjs';
import { API_CONFIG } from './api.config';
import {
  Alerta,
  ResumenDashboard,
  Ruta,
  CrearRuta,
  Horario,
  CrearHorario,
  Vehiculo,
  CrearVehiculo,
  UbicacionVehiculo
} from '../models/transport.models';

// Datos mock para desarrollo
const MOCK_RESUMEN: ResumenDashboard = {
  vehiculosActivos: 128,
  vehiculosRetrasados: 9,
  tasaPuntualidad: 92,
  pasajerosHoy: 48210,
  incidenciasAbiertas: 4,
  ultimaSincronizacion: new Date().toISOString()
};

const MOCK_VEHICULOS: Vehiculo[] = [
  {
    id: 'V-1021',
    codigo: 'BUS-21',
    placa: 'TR-5210',
    modelo: 'Volare W9',
    ruta: 'Norte Centro',
    conductor: 'Valeria Soto',
    estado: 'En ruta',
    ocupacion: 64,
    ultimoReporte: 'Hace 2 min'
  },
  {
    id: 'V-2042',
    codigo: 'BUS-77',
    placa: 'TR-8821',
    modelo: 'Marcopolo Senior',
    ruta: 'Industrial Sur',
    conductor: 'Mario Díaz',
    estado: 'Retrasado',
    ocupacion: 78,
    ultimoReporte: 'Hace 6 min'
  },
  {
    id: 'V-3099',
    codigo: 'BUS-13',
    placa: 'TR-1098',
    modelo: 'Scania Citywide',
    ruta: 'Aeropuerto',
    conductor: 'Camila Reyes',
    estado: 'En terminal',
    ocupacion: 12,
    ultimoReporte: 'Hace 1 min'
  }
];

const MOCK_RUTAS: Ruta[] = [
  {
    id: 'R-01',
    codigo: 'R-NC',
    nombre: 'Norte Centro',
    origen: 'Terminal Norte',
    destino: 'Centro Histórico',
    paradas: 18,
    distanciaKm: 22.4,
    color: '#1d4ed8'
  },
  {
    id: 'R-07',
    codigo: 'R-IS',
    nombre: 'Industrial Sur',
    origen: 'Zona Industrial',
    destino: 'Estación Sur',
    paradas: 14,
    distanciaKm: 17.1,
    color: '#14b8a6'
  }
];

const MOCK_HORARIOS: Horario[] = [
  {
    id: 'H-101',
    codigoRuta: 'R-NC',
    tipoDia: 'Laboral',
    horaInicio: '05:00',
    horaFin: '22:30',
    frecuenciaMin: 10,
    zonaHoraria: 'America/Bogota',
    notas: 'Refuerzo en hora pico'
  },
  {
    id: 'H-220',
    codigoRuta: 'R-IS',
    tipoDia: 'Sábado',
    horaInicio: '06:00',
    horaFin: '21:00',
    frecuenciaMin: 15,
    zonaHoraria: 'America/Bogota'
  }
];

const MOCK_ALERTAS: Alerta[] = [
  {
    id: 'A-01',
    tipo: 'Incidencia',
    titulo: 'Bloqueo vial en Av. Central',
    descripcion: 'Se detecta congestión severa por obras. Recalcular rutas.',
    severidad: 'Alta',
    creadoEn: 'Hace 8 min'
  },
  {
    id: 'A-07',
    tipo: 'Clima',
    titulo: 'Lluvias intensas',
    descripcion: 'Reducir velocidad en corredores Norte y Oeste.',
    severidad: 'Media',
    creadoEn: 'Hace 22 min'
  }
];

const MOCK_UBICACIONES: UbicacionVehiculo[] = [
  { id: 'V-1021', latitud: 4.653, longitud: -74.083, actualizadoEn: new Date().toISOString() },
  { id: 'V-2042', latitud: 4.62, longitud: -74.12, actualizadoEn: new Date().toISOString() },
  { id: 'V-3099', latitud: 4.69, longitud: -74.05, actualizadoEn: new Date().toISOString() }
];

@Injectable({ providedIn: 'root' })
export class TransportApiService {
  constructor(private http: HttpClient) {}

  // ========================================
  // MICROSERVICIO DE ASIGNACIÓN
  // ========================================

  /**
   * Obtiene el resumen general del dashboard
   * Endpoint: GET /asignacion/resumen
   */
  obtenerResumen() {
    return this.http
      .get<ResumenDashboard>(API_CONFIG.asignacion.resumen)
      .pipe(catchError(() => of(MOCK_RESUMEN)));
  }

  /**
   * Obtiene todos los horarios
   * Endpoint: GET /asignacion/horarios
   */
  obtenerHorarios() {
    return this.http
      .get<Horario[]>(API_CONFIG.asignacion.horarios)
      .pipe(catchError(() => of(MOCK_HORARIOS)));
  }

  /**
   * Crea un nuevo horario
   * Endpoint: POST /asignacion/horarios
   */
  crearHorario(datos: CrearHorario) {
    return this.http
      .post<Horario>(API_CONFIG.asignacion.horarios, datos)
      .pipe(catchError(() => of({
        ...datos,
        id: `H-${Math.floor(Math.random() * 900) + 100}`
      } as Horario)));
  }

  /**
   * Obtiene todas las alertas
   * Endpoint: GET /asignacion/alertas
   */
  obtenerAlertas() {
    return this.http
      .get<Alerta[]>(API_CONFIG.asignacion.alertas)
      .pipe(catchError(() => of(MOCK_ALERTAS)));
  }

  // ========================================
  // MICROSERVICIO DE VEHÍCULOS
  // ========================================

  /**
   * Obtiene todos los vehículos
   * Endpoint: GET /vehiculos/vehiculos
   */
  obtenerVehiculos() {
    return this.http
      .get<Vehiculo[]>(API_CONFIG.vehiculos.listar)
      .pipe(catchError(() => of(MOCK_VEHICULOS)));
  }

  /**
   * Crea un nuevo vehículo
   * Endpoint: POST /vehiculos/vehiculos
   */
  crearVehiculo(datos: CrearVehiculo) {
    return this.http
      .post<Vehiculo>(API_CONFIG.vehiculos.crear, datos)
      .pipe(catchError(() => of({
        ...datos,
        id: `V-${Math.floor(Math.random() * 9000) + 1000}`,
        ocupacion: 0,
        ultimoReporte: 'Hace 1 min'
      } as Vehiculo)));
  }

  /**
   * Obtiene ubicaciones de vehículos en tiempo real (polling cada 15 segundos)
   * Endpoint: GET /vehiculos/ubicaciones
   */
  obtenerUbicacionesVehiculos$() {
    return timer(0, 15000).pipe(
      switchMap(() =>
        this.http
          .get<UbicacionVehiculo[]>(API_CONFIG.vehiculos.ubicaciones)
          .pipe(catchError(() => of(MOCK_UBICACIONES)))
      )
    );
  }

  // ========================================
  // MICROSERVICIO DE RUTAS
  // ========================================

  /**
   * Obtiene todas las rutas
   * Endpoint: GET /rutas/rutas
   */
  obtenerRutas() {
    return this.http
      .get<Ruta[]>(API_CONFIG.rutas.listar)
      .pipe(catchError(() => of(MOCK_RUTAS)));
  }

  /**
   * Crea una nueva ruta
   * Endpoint: POST /rutas/rutas
   */
  crearRuta(datos: CrearRuta) {
    return this.http
      .post<Ruta>(API_CONFIG.rutas.crear, datos)
      .pipe(catchError(() => of({
        ...datos,
        id: `R-${Math.floor(Math.random() * 90) + 10}`
      } as Ruta)));
  }

  // ========================================
  // MÉTODOS LEGACY (Compatibilidad)
  // ========================================

  /** @deprecated Usar obtenerResumen() */
  getOverview() { return this.obtenerResumen(); }
  
  /** @deprecated Usar obtenerVehiculos() */
  getVehicles() { return this.obtenerVehiculos(); }
  
  /** @deprecated Usar crearVehiculo() */
  createVehicle(payload: CrearVehiculo) { return this.crearVehiculo(payload); }
  
  /** @deprecated Usar obtenerRutas() */
  getRoutes() { return this.obtenerRutas(); }
  
  /** @deprecated Usar crearRuta() */
  createRoute(payload: CrearRuta) { return this.crearRuta(payload); }
  
  /** @deprecated Usar obtenerHorarios() */
  getSchedules() { return this.obtenerHorarios(); }
  
  /** @deprecated Usar crearHorario() */
  createSchedule(payload: CrearHorario) { return this.crearHorario(payload); }
  
  /** @deprecated Usar obtenerAlertas() */
  getAlerts() { return this.obtenerAlertas(); }
  
  /** @deprecated Usar obtenerUbicacionesVehiculos$() */
  getVehicleLocations$() { return this.obtenerUbicacionesVehiculos$(); }
}

