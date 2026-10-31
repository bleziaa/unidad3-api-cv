# API de experiencias profesionales

API REST para administrar la experiencia laboral registrada en una hoja de vida. Desarrollada con Node.js, Express y MongoDB.

## Funcionalidades

- Registro de experiencias profesionales.
- Consulta del listado y de registros individuales.
- Actualización y eliminación de experiencias.
- Validación de datos e identificadores.
- Documentación de endpoints con Swagger.
- Pruebas automatizadas del controlador.

## Tecnologías

Node.js · Express · MongoDB · Mongoose · Swagger · Node Test Runner

## Endpoints

| Método | Ruta | Operación |
|---|---|---|
| GET | /api/experiencias | Consultar experiencias |
| GET | /api/experiencias/:id | Consultar una experiencia |
| POST | /api/experiencias | Registrar experiencia |
| PUT | /api/experiencias/:id | Actualizar experiencia |
| DELETE | /api/experiencias/:id | Eliminar experiencia |

## Estructura

```
src/
  config/
  controllers/
  docs/
  models/
  routes/
  server.js
test/
```

## Verificación

Las pruebas automatizadas se ejecutan con `npm test`. La documentación interactiva de la API está disponible en `/api-docs` cuando el servidor está en ejecución.
