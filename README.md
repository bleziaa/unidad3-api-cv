# API REST — Experiencias profesionales

Proyecto académico de la Unidad 3 de Desarrollo de Software Web. API REST para registrar, consultar, actualizar y eliminar experiencias profesionales de una hoja de vida.

## Tecnologías

- Node.js y Express 5
- MongoDB y Mongoose
- Swagger UI / OpenAPI
- React + Vite para el panel administrativo relacionado

## Requisitos

- Node.js 20 o superior
- npm
- MongoDB local o una instancia accesible

## Instalación

1. Instalar dependencias con `npm install`.
2. Crear un archivo `.env` a partir de `.env.example`.
3. Configurar la URI de MongoDB.
4. Iniciar el servidor con `npm run dev`.

La API queda disponible en `http://127.0.0.1:3000`.

## Variables de entorno

| Variable | Descripción | Valor local de ejemplo |
|---|---|---|
| PORT | Puerto HTTP | 3000 |
| HOST | Interfaz de escucha | 127.0.0.1 |
| MONGODB_URI | Cadena de conexión | mongodb://127.0.0.1:27017/hoja_vida |
| CORS_ORIGINS | Orígenes permitidos separados por coma | http://127.0.0.1:5173 |

No publicar el archivo `.env` ni credenciales reales.

## Endpoints

Base: `/api/experiencias`

| Método | Ruta | Función |
|---|---|---|
| GET | `/` | Listar experiencias |
| GET | `/:id` | Consultar una experiencia |
| POST | `/` | Crear una experiencia |
| PUT | `/:id` | Actualizar una experiencia |
| DELETE | `/:id` | Eliminar una experiencia |

### Ejemplo de cuerpo JSON

```json
{
  "empresa": "Empresa de ejemplo",
  "cargo": "Desarrollador web",
  "descripcion": "Desarrollo y mantenimiento de aplicaciones web.",
  "fechaInicio": "2025-01-15",
  "fechaFin": null,
  "actualmenteTrabajo": true
}
```

Campos obligatorios: `empresa`, `cargo`, `descripcion` y `fechaInicio`. Los identificadores incorrectos generan HTTP 400 y los registros inexistentes HTTP 404.

## Documentación interactiva

Con el servidor iniciado:

- Swagger UI: `http://127.0.0.1:3000/api-docs`
- Especificación OpenAPI: `http://127.0.0.1:3000/api-docs.json`
- Salud: `http://127.0.0.1:3000/api/health`

## Pruebas

Ejecutar `npm test`. Las pruebas usan el módulo integrado `node:test` y sustituyen temporalmente las operaciones del modelo para comprobar respuestas HTTP, validación, identificadores inválidos, registros inexistentes y errores de consulta. No requieren modificar datos reales de MongoDB.

Para comprobar el flujo completo contra MongoDB, iniciar la API y ejecutar peticiones desde Swagger o Postman.

## Estructura

```text
src/
  config/       Configuración de base de datos y Swagger
  controllers/  Lógica CRUD
  models/       Esquema Mongoose
  routes/       Rutas HTTP
  server.js     Configuración del servidor
test/
  experienciaController.test.js
```

## Frontend relacionado

En otra terminal, desde el proyecto React:

```bash
cd ../UPROYECTOS-REACT/frontend
npm install
npm run dev
```

Panel: `http://127.0.0.1:5173/admin/experiencias`.

## Seguridad y despliegue

Antes de publicar, configurar HTTPS, URI de MongoDB protegida, CORS limitado al dominio definitivo, variables de entorno seguras y hosting compatible con Node.js. Para contenedores o hosting puede configurarse `HOST=0.0.0.0` según el proveedor.
