require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const connectDB = require('./config/database');
const experienciaRoutes = require('./routes/experienciaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Permite herramientas locales como curl/Postman, y solo orígenes declarados en navegador.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
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
app.use('/api/experiencias', experienciaRoutes);

async function startServer() {
  await connectDB();
  app.listen(PORT, HOST, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
    console.log(`Documentación Swagger: http://${HOST}:${PORT}/api-docs`);
  });
}

startServer();
