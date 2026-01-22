// Configuración de Microservicios

// Microservicio de Vehículos
export const API_VEHICULOS = {
  baseUrl: 'https://api.example.com/vehiculos',
  endpoints: {
    listar: '/vehiculos',           // GET - Listar todos los vehículos
    crear: '/vehiculos',            // POST - Crear un vehículo
    ubicaciones: '/ubicaciones'     // GET - Ubicaciones en tiempo real
  }
};

// Microservicio de Rutas
export const API_RUTAS = {
  baseUrl: 'https://api.example.com/rutas',
  endpoints: {
    listar: '/rutas',              // GET - Listar todas las rutas
    crear: '/rutas'                // POST - Crear una ruta
  }
};

// Microservicio de Asignación (Relación entre vehículos y rutas)
export const API_ASIGNACION = {
  baseUrl: 'https://api.example.com/asignacion',
  endpoints: {
    resumen: '/resumen',           // GET - Dashboard general
    horarios: '/horarios',         // GET/POST - Horarios de rutas
    alertas: '/alertas'            // GET - Alertas e incidencias
  }
};

// URLs completas para facilidad de uso
export const API_CONFIG = {
  // Microservicio de Vehículos
  vehiculos: {
    listar: `${API_VEHICULOS.baseUrl}${API_VEHICULOS.endpoints.listar}`,
    crear: `${API_VEHICULOS.baseUrl}${API_VEHICULOS.endpoints.crear}`,
    ubicaciones: `${API_VEHICULOS.baseUrl}${API_VEHICULOS.endpoints.ubicaciones}`
  },
  // Microservicio de Rutas
  rutas: {
    listar: `${API_RUTAS.baseUrl}${API_RUTAS.endpoints.listar}`,
    crear: `${API_RUTAS.baseUrl}${API_RUTAS.endpoints.crear}`
  },
  // Microservicio de Asignación
  asignacion: {
    resumen: `${API_ASIGNACION.baseUrl}${API_ASIGNACION.endpoints.resumen}`,
    horarios: `${API_ASIGNACION.baseUrl}${API_ASIGNACION.endpoints.horarios}`,
    alertas: `${API_ASIGNACION.baseUrl}${API_ASIGNACION.endpoints.alertas}`
  }
};

