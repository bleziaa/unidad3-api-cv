const mongoose = require('mongoose');

const experienciaSchema = new mongoose.Schema({
  empresa: {
    type: String,
    required: [true, 'La empresa es obligatoria'],
    trim: true,
    maxlength: [100, 'La empresa no puede superar 100 caracteres']
  },
  cargo: {
    type: String,
    required: [true, 'El cargo es obligatorio'],
    trim: true,
    maxlength: [100, 'El cargo no puede superar 100 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    maxlength: [1000, 'La descripción no puede superar 1000 caracteres']
  },
  fechaInicio: {
    type: Date,
    required: [true, 'La fecha de inicio es obligatoria']
  },
  fechaFin: {
    type: Date,
    default: null
  },
  actualmenteTrabajo: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Experiencia', experienciaSchema);
