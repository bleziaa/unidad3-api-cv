/**
 * @swagger
 * /api/experiencias:
 *   post:
 *     summary: Crear una experiencia profesional
 *     tags: [Experiencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExperienciaEntrada'
 *     responses:
 *       201:
 *         description: Experiencia creada correctamente
 *       400:
 *         description: Datos inválidos
 *   get:
 *     summary: Listar todas las experiencias profesionales
 *     tags: [Experiencias]
 *     responses:
 *       200:
 *         description: Lista de experiencias
 *       500:
 *         description: Error al consultar
 *
 * /api/experiencias/{id}:
 *   get:
 *     summary: Consultar una experiencia por su ID
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Experiencia encontrada
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Experiencia no encontrada
 *   put:
 *     summary: Actualizar una experiencia profesional
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExperienciaEntrada'
 *     responses:
 *       200:
 *         description: Experiencia actualizada correctamente
 *       400:
 *         description: Datos o ID inválidos
 *       404:
 *         description: Experiencia no encontrada
 *   delete:
 *     summary: Eliminar una experiencia profesional
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Experiencia eliminada correctamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Experiencia no encontrada
 */
