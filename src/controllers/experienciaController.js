const mongoose = require('mongoose');
const Experiencia = require('../models/Experiencia');

async function crearExperiencia(req, res) {
  try {
    const experiencia = await Experiencia.create(req.body);
    return res.status(201).json({
      mensaje: 'Experiencia creada correctamente',
      datos: experiencia
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: 'Datos inválidos', error: error.message });
    }
    return res.status(500).json({ mensaje: 'Error al crear la experiencia' });
  }
}

async function obtenerExperiencias(req, res) {
  try {
    const experiencias = await Experiencia.find().sort({ fechaInicio: -1 });
    return res.status(200).json({ total: experiencias.length, datos: experiencias });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al consultar las experiencias' });
  }
}

async function obtenerExperiencia(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ mensaje: 'El ID proporcionado no es válido' });
    }
    const experiencia = await Experiencia.findById(req.params.id);
    if (!experiencia) {
      return res.status(404).json({ mensaje: 'Experiencia no encontrada' });
    }
    return res.status(200).json({ datos: experiencia });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al consultar la experiencia' });
  }
}

async function actualizarExperiencia(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ mensaje: 'El ID proporcionado no es válido' });
    }
    const experiencia = await Experiencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!experiencia) {
      return res.status(404).json({ mensaje: 'Experiencia no encontrada' });
    }
    return res.status(200).json({
      mensaje: 'Experiencia actualizada correctamente',
      datos: experiencia
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: 'Datos inválidos', error: error.message });
    }
    return res.status(500).json({ mensaje: 'Error al actualizar la experiencia' });
  }
}

async function eliminarExperiencia(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ mensaje: 'El ID proporcionado no es válido' });
    }
    const experiencia = await Experiencia.findByIdAndDelete(req.params.id);
    if (!experiencia) {
      return res.status(404).json({ mensaje: 'Experiencia no encontrada' });
    }
    return res.status(200).json({ mensaje: 'Experiencia eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar la experiencia' });
  }
}

module.exports = {
  crearExperiencia,
  obtenerExperiencias,
  obtenerExperiencia,
  actualizarExperiencia,
  eliminarExperiencia
};
