const mongoose = require('mongoose');

async function conectarBaseDeDatos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conexión con MongoDB establecida');
  } catch (error) {
    console.error('No fue posible conectar con MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = conectarBaseDeDatos;
