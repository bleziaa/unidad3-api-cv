# Registro de pruebas — Unidad 3

Fecha de verificación: 31 de octubre de 2026.
Entorno: CachyOS, Node.js, Express, MongoDB local y React/Vite.

## Pruebas automatizadas

Comando: `npm test`

Resultado: **12 pruebas aprobadas, 0 fallidas**.

Cobertura funcional:
- POST: creación correcta y rechazo de datos inválidos.
- GET: listado, consulta por ID, ID inválido y registro inexistente.
- PUT: actualización, ejecución de validadores y registro inexistente.
- DELETE: eliminación, ID inválido y registro inexistente.
- Manejo de error en consulta.

Las pruebas automatizadas aíslan las operaciones del modelo para no alterar la base de datos real.

## Pruebas manuales de integración

Se ejecutó una secuencia temporal de creación, consulta, actualización y eliminación contra la API conectada a MongoDB. El registro temporal fue eliminado al finalizar.

| Verificación | Resultado |
|---|---|
| GET /api/health | HTTP 200 |
| GET /api-docs/ | HTTP 200 |
| GET /api-docs.json | HTTP 200 |
| POST /api/experiencias | HTTP 201 |
| GET /api/experiencias/:id | HTTP 200 |
| PUT /api/experiencias/:id | HTTP 200 |
| DELETE /api/experiencias/:id | HTTP 200 |
| GET del registro eliminado | HTTP 404 |
| GET /api/experiencias | HTTP 200 |
| CORS desde origen local permitido | Correcto |

## Frontend

Comando: `npm run build` en `UPROYECTOS-REACT/frontend`.

Resultado: compilación de producción completada correctamente. La ruta local `/admin/experiencias` respondió HTTP 200.

## Pendiente de evidencia visual

Agregar capturas propias de Swagger, Postman y del panel administrativo en ejecución. Este registro no sustituye capturas solicitadas por la rúbrica docente.
