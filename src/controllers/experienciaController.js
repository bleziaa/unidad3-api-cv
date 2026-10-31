const mongoose = require('mongoose');
const Experiencia = require('../models/Experiencia');

function idEsValido(id) {
  return mongoose.isValidObjectId(id);
}

async function crearExperiencia(req, res) {
  try {
    const nuevaExperiencia = await Experiencia.create(req.body);

    return res.status(201).json({
      mensaje: 'Experiencia creada correctamente',
      datos: nuevaExperiencia
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        mensaje: 'Datos inválidos',
        error: error.message
      });
    }

    return res.status(500).json({
      mensaje: 'Error al crear la experiencia'
    });
  }
}

async function obtenerExperiencias(req, res) {
  try {
    const listaExperiencias = await Experiencia.find().sort({ fechaInicio: -1 });

    return res.status(200).json({
      total: listaExperiencias.length,
      datos: listaExperiencias
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al consultar las experiencias'
    });
  }
}

async function obtenerExperiencia(req, res) {
  try {
    const { id } = req.params;

    if (!idEsValido(id)) {
      return res.status(400).json({
        mensaje: 'El ID proporcionado no es válido'
      });
    }

    const experienciaEncontrada = await Experiencia.findById(id);

    if (!experienciaEncontrada) {
      return res.status(404).json({
        mensaje: 'Experiencia no encontrada'
      });
    }

    return res.status(200).json({ datos: experienciaEncontrada });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al consultar la experiencia'
    });
  }
}

async function actualizarExperiencia(req, res) {
  try {
    const { id } = req.params;

    if (!idEsValido(id)) {
      return res.status(400).json({
        mensaje: 'El ID proporcionado no es válido'
      });
    }

    const experienciaActualizada = await Experiencia.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!experienciaActualizada) {
      return res.status(404).json({
        mensaje: 'Experiencia no encontrada'
      });
    }

    return res.status(200).json({
      mensaje: 'Experiencia actualizada correctamente',
      datos: experienciaActualizada
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        mensaje: 'Datos inválidos',
        error: error.message
      });
    }

    return res.status(500).json({
      mensaje: 'Error al actualizar la experiencia'
    });
  }
}

async function eliminarExperiencia(req, res) {
  try {
    const { id } = req.params;

    if (!idEsValido(id)) {
      return res.status(400).json({
        mensaje: 'El ID proporcionado no es válido'
      });
    }

    const experienciaEliminada = await Experiencia.findByIdAndDelete(id);

    if (!experienciaEliminada) {
      return res.status(404).json({
        mensaje: 'Experiencia no encontrada'
      });
    }

    return res.status(200).json({
      mensaje: 'Experiencia eliminada correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al eliminar la experiencia'
    });
  }
}

module.exports = {
  crearExperiencia,
  obtenerExperiencias,
  obtenerExperiencia,
  actualizarExperiencia,
  eliminarExperiencia
};
