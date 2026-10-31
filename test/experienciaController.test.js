const test = require('node:test');
const assert = require('node:assert/strict');
const Experiencia = require('../src/models/Experiencia');
const controller = require('../src/controllers/experienciaController');

const validId = '507f1f77bcf86cd799439011';
const sample = { _id: validId, empresa: 'Empresa de prueba', cargo: 'Desarrollador', descripcion: 'Desarrollo de aplicaciones', fechaInicio: new Date('2025-01-01') };

function response() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; }
  };
}

test('POST crea una experiencia y responde 201', async () => {
  Experiencia.create = async data => ({ ...data, _id: validId });
  const res = response();
  await controller.crearExperiencia({ body: sample }, res);
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.datos._id, validId);
});

test('POST responde 400 cuando los datos son inválidos', async () => {
  Experiencia.create = async () => { const error = new Error('empresa requerida'); error.name = 'ValidationError'; throw error; };
  const res = response();
  await controller.crearExperiencia({ body: {} }, res);
  assert.equal(res.statusCode, 400);
});

test('GET lista experiencias y devuelve el total', async () => {
  Experiencia.find = () => ({ sort: async () => [sample] });
  const res = response();
  await controller.obtenerExperiencias({}, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.total, 1);
});

test('GET por ID rechaza identificadores inválidos', async () => {
  const res = response();
  await controller.obtenerExperiencia({ params: { id: 'incorrecto' } }, res);
  assert.equal(res.statusCode, 400);
});

test('GET por ID devuelve el registro encontrado', async () => {
  Experiencia.findById = async () => sample;
  const res = response();
  await controller.obtenerExperiencia({ params: { id: validId } }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.datos.empresa, sample.empresa);
});

test('GET por ID devuelve 404 si no existe', async () => {
  Experiencia.findById = async () => null;
  const res = response();
  await controller.obtenerExperiencia({ params: { id: validId } }, res);
  assert.equal(res.statusCode, 404);
});

test('PUT actualiza y activa los validadores del modelo', async () => {
  let options;
  Experiencia.findByIdAndUpdate = async (id, data, opts) => { options = opts; return { ...sample, ...data }; };
  const res = response();
  await controller.actualizarExperiencia({ params: { id: validId }, body: { cargo: 'Líder técnico' } }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.datos.cargo, 'Líder técnico');
  assert.equal(options.runValidators, true);
  assert.equal(options.new, true);
});

test('PUT devuelve 404 si no existe el registro', async () => {
  Experiencia.findByIdAndUpdate = async () => null;
  const res = response();
  await controller.actualizarExperiencia({ params: { id: validId }, body: {} }, res);
  assert.equal(res.statusCode, 404);
});

test('DELETE elimina una experiencia existente', async () => {
  Experiencia.findByIdAndDelete = async () => sample;
  const res = response();
  await controller.eliminarExperiencia({ params: { id: validId } }, res);
  assert.equal(res.statusCode, 200);
  assert.match(res.body.mensaje, /eliminada/);
});

test('DELETE devuelve 404 si no existe', async () => {
  Experiencia.findByIdAndDelete = async () => null;
  const res = response();
  await controller.eliminarExperiencia({ params: { id: validId } }, res);
  assert.equal(res.statusCode, 404);
});

test('DELETE rechaza identificadores inválidos', async () => {
  const res = response();
  await controller.eliminarExperiencia({ params: { id: 'x' } }, res);
  assert.equal(res.statusCode, 400);
});

test('GET lista responde 500 ante errores de base de datos', async () => {
  Experiencia.find = () => ({ sort: async () => { throw new Error('fallo de conexión'); } });
  const res = response();
  await controller.obtenerExperiencias({}, res);
  assert.equal(res.statusCode, 500);
});
