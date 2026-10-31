const test = require('node:test');
const assert = require('node:assert/strict');
const Experiencia = require('../src/models/Experiencia');
const controlador = require('../src/controllers/experienciaController');

const idDePrueba = '507f1f77bcf86cd799439011';

const experienciaDePrueba = {
  _id: idDePrueba,
  empresa: 'Empresa de prueba',
  cargo: 'Desarrollador',
  descripcion: 'Desarrollo de aplicaciones',
  fechaInicio: new Date('2025-01-01')
};

function crearRespuesta() {
  return {
    statusCode: 200,
    body: undefined,

    status(codigo) {
      this.statusCode = codigo;
      return this;
    },

    json(contenido) {
      this.body = contenido;
      return this;
    }
  };
}

test('POST crea una experiencia y responde 201', async () => {
  Experiencia.create = async datos => ({
    ...datos,
    _id: idDePrueba
  });

  const respuesta = crearRespuesta();
  await controlador.crearExperiencia({ body: experienciaDePrueba }, respuesta);

  assert.equal(respuesta.statusCode, 201);
  assert.equal(respuesta.body.datos._id, idDePrueba);
});

test('POST responde 400 cuando los datos son inválidos', async () => {
  Experiencia.create = async () => {
    const error = new Error('empresa requerida');
    error.name = 'ValidationError';
    throw error;
  };

  const respuesta = crearRespuesta();
  await controlador.crearExperiencia({ body: {} }, respuesta);

  assert.equal(respuesta.statusCode, 400);
});

test('GET lista las experiencias y devuelve el total', async () => {
  Experiencia.find = () => ({
    sort: async () => [experienciaDePrueba]
  });

  const respuesta = crearRespuesta();
  await controlador.obtenerExperiencias({}, respuesta);

  assert.equal(respuesta.statusCode, 200);
  assert.equal(respuesta.body.total, 1);
});

test('GET por ID rechaza identificadores inválidos', async () => {
  const respuesta = crearRespuesta();

  await controlador.obtenerExperiencia(
    { params: { id: 'incorrecto' } },
    respuesta
  );

  assert.equal(respuesta.statusCode, 400);
});

test('GET por ID devuelve la experiencia encontrada', async () => {
  Experiencia.findById = async () => experienciaDePrueba;

  const respuesta = crearRespuesta();
  await controlador.obtenerExperiencia(
    { params: { id: idDePrueba } },
    respuesta
  );

  assert.equal(respuesta.statusCode, 200);
  assert.equal(respuesta.body.datos.empresa, experienciaDePrueba.empresa);
});

test('GET por ID devuelve 404 cuando no existe el registro', async () => {
  Experiencia.findById = async () => null;

  const respuesta = crearRespuesta();
  await controlador.obtenerExperiencia(
    { params: { id: idDePrueba } },
    respuesta
  );

  assert.equal(respuesta.statusCode, 404);
});

test('PUT actualiza la experiencia y ejecuta los validadores', async () => {
  let opcionesDeActualizacion;

  Experiencia.findByIdAndUpdate = async (id, datos, opciones) => {
    opcionesDeActualizacion = opciones;
    return { ...experienciaDePrueba, ...datos };
  };

  const respuesta = crearRespuesta();
  await controlador.actualizarExperiencia(
    {
      params: { id: idDePrueba },
      body: { cargo: 'Líder técnico' }
    },
    respuesta
  );

  assert.equal(respuesta.statusCode, 200);
  assert.equal(respuesta.body.datos.cargo, 'Líder técnico');
  assert.equal(opcionesDeActualizacion.runValidators, true);
  assert.equal(opcionesDeActualizacion.new, true);
});

test('PUT devuelve 404 cuando no encuentra la experiencia', async () => {
  Experiencia.findByIdAndUpdate = async () => null;

  const respuesta = crearRespuesta();
  await controlador.actualizarExperiencia(
    { params: { id: idDePrueba }, body: {} },
    respuesta
  );

  assert.equal(respuesta.statusCode, 404);
});

test('DELETE elimina una experiencia existente', async () => {
  Experiencia.findByIdAndDelete = async () => experienciaDePrueba;

  const respuesta = crearRespuesta();
  await controlador.eliminarExperiencia(
    { params: { id: idDePrueba } },
    respuesta
  );

  assert.equal(respuesta.statusCode, 200);
  assert.match(respuesta.body.mensaje, /eliminada/);
});

test('DELETE devuelve 404 cuando el registro no existe', async () => {
  Experiencia.findByIdAndDelete = async () => null;

  const respuesta = crearRespuesta();
  await controlador.eliminarExperiencia(
    { params: { id: idDePrueba } },
    respuesta
  );

  assert.equal(respuesta.statusCode, 404);
});

test('DELETE rechaza identificadores inválidos', async () => {
  const respuesta = crearRespuesta();

  await controlador.eliminarExperiencia(
    { params: { id: 'x' } },
    respuesta
  );

  assert.equal(respuesta.statusCode, 400);
});

test('GET lista responde 500 cuando falla la consulta a la base de datos', async () => {
  Experiencia.find = () => ({
    sort: async () => {
      throw new Error('fallo de conexión');
    }
  });

  const respuesta = crearRespuesta();
  await controlador.obtenerExperiencias({}, respuesta);

  assert.equal(respuesta.statusCode, 500);
});
