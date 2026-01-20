// Configuración de MSAL para Azure B2C
// Este archivo contiene toda la configuración necesaria para conectar con Azure AD B2C

import { 
  BrowserCacheLocation, 
  IPublicClientApplication, 
  LogLevel, 
  PublicClientApplication 
} from '@azure/msal-browser';

// CONFIGURACIÓN DE AZURE B2C
// Reemplaza estos valores con los de tu tenant
const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_DSY2206FU', // Nombre del flujo de usuario
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://Duoctenantb2ctest.b2clogin.com/Duoctenantb2ctest.onmicrosoft.com/B2C_1_DSY2206FU',
    },
  },
  authorityDomain: 'Duoctenantb2ctest.b2clogin.com'
};

// Configuración de MSAL
export const msalConfig = {
  auth: {
    clientId: '9edb51ef-ce7a-4ca2-9450-ac53ee55f56a', // Application (client) ID del registro de app en B2C
    authority: b2cPolicies.authorities.signUpSignIn.authority, // Flujo de usuario
    knownAuthorities: [b2cPolicies.authorityDomain], // Dominio del tenant B2C
    redirectUri: 'http://localhost:4200', // URI de redirección configurado en B2C
    postLogoutRedirectUri: 'http://localhost:4200', // URI después del logout
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Guardar tokens en localStorage
    storeAuthStateInCookie: false, // No usar cookies (mejor para SPAs)
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
      logLevel: LogLevel.Verbose, // Nivel de logs para debugging
    }
  }
};

// Scopes que se solicitarán al hacer login
// offline_access: permite obtener refresh tokens
// openid: permite obtener ID token con información del usuario
// Client ID como scope: en B2C, usar el client ID como scope permite obtener un access token
export const loginRequest = {
  scopes: ['openid', 'offline_access', '9edb51ef-ce7a-4ca2-9450-ac53ee55f56a']
};

// Configuración para llamadas al backend
// En Azure B2C, cuando no hay scopes de API específicos, el client ID se usa como scope
// Esto permite obtener un access token que puede ser validado por el backend
export const apiConfig = {
  uri2: 'http://localhost:8080/api/secure', // Endpoint del backend
  uri: 'https://7gwjxjulr6.execute-api.us-east-1.amazonaws.com/DEV3/dsy2206', // Endpoint del backend
  scopes: ['9edb51ef-ce7a-4ca2-9450-ac53ee55f56a'] // Client ID como scope para obtener access token
};

// Instancia de MSAL que se usará en toda la aplicación
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}
