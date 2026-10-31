require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const conectarBaseDeDatos = require('./config/database');
const rutasExperiencias = require('./routes/experienciaRoutes');

const app = express();
const puerto = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

const origenesPermitidos = (
  process.env.CORS_ORIGINS ||
  'http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173'
)
  .split(',')
  .map(origen => origen.trim())
  .filter(Boolean);

app.use(cors({
  origin(origen, callback) {
    // Se permiten las herramientas sin origen, como curl y Postman.
    if (!origen || origenesPermitidos.includes(origen)) {
      return callback(null, true);
    }

    return callback(new Error('Origen no permitido por CORS'));
  }
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de hoja de vida funcionando',
    proyecto: 'Unidad 3 - Desarrollo de Software Web',
    estado: 'OK'
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ estado: 'saludable' });
});

app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/experiencias', rutasExperiencias);

async function iniciarServidor() {
  await conectarBaseDeDatos();

  app.listen(puerto, host, () => {
    console.log(`Servidor disponible en http://${host}:${puerto}`);
    console.log(`Documentación Swagger: http://${host}:${puerto}/api-docs`);
  });
}

iniciarServidor();
