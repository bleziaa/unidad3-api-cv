const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Hoja de Vida',
      version: '1.0.0',
      description: 'API REST para administrar experiencias profesionales mediante Express.js y MongoDB.'
    },
    servers: [{ url: 'http://127.0.0.1:3000', description: 'Servidor local de desarrollo' }],
    tags: [{ name: 'Experiencias', description: 'Operaciones CRUD de experiencias profesionales' }],
    components: {
      schemas: {
        Experiencia: {
          type: 'object',
          required: ['empresa', 'cargo', 'descripcion', 'fechaInicio'],
          properties: {
            _id: { type: 'string', example: '64f1a2b3c4d5e6f789012345' },
            empresa: { type: 'string', example: 'Empresa de ejemplo' },
            cargo: { type: 'string', example: 'Desarrollador web' },
            descripcion: { type: 'string', example: 'Desarrollo y mantenimiento de aplicaciones web.' },
            fechaInicio: { type: 'string', format: 'date-time', example: '2025-02-01T00:00:00.000Z' },
            fechaFin: { type: 'string', format: 'date-time', nullable: true },
            actualmenteTrabajo: { type: 'boolean', example: true }
          }
        },
        ExperienciaEntrada: {
          type: 'object',
          required: ['empresa', 'cargo', 'descripcion', 'fechaInicio'],
          properties: {
            empresa: { type: 'string', example: 'Empresa de ejemplo' },
            cargo: { type: 'string', example: 'Desarrollador web' },
            descripcion: { type: 'string', example: 'Desarrollo y mantenimiento de aplicaciones web.' },
            fechaInicio: { type: 'string', format: 'date-time', example: '2025-02-01' },
            fechaFin: { type: 'string', format: 'date-time', nullable: true, example: null },
            actualmenteTrabajo: { type: 'boolean', example: true }
          }
        }
      }
    }
  },
  apis: ['./src/docs/swagger.js']
};

module.exports = swaggerJsdoc(options);
