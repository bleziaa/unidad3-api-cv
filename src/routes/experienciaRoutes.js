const express = require('express');
const router = express.Router();

const {
  crearExperiencia,
  obtenerExperiencias,
  obtenerExperiencia,
  actualizarExperiencia,
  eliminarExperiencia
} = require('../controllers/experienciaController');

router.post('/', crearExperiencia);
router.get('/', obtenerExperiencias);
router.get('/:id', obtenerExperiencia);
router.put('/:id', actualizarExperiencia);
router.delete('/:id', eliminarExperiencia);

module.exports = router;
