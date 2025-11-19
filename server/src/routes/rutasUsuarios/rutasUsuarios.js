import deleteHandlerUsuario from '../../handlers/handlersUsuarios/deleteHandlerUsuario.js';
import getHandlerUsuarios from '../../handlers/handlersUsuarios/getHandlerUsuario.js';
import postHandlerUsuarios from '../../handlers/handlersUsuarios/postHandlerUsuario.js';
import putHandlerUsuario from '../../handlers/handlersUsuarios/putHandlerUsuario.js';

import express from 'express';

const router = express.Router();

router.post('/', postHandlerUsuarios);
router.get('/', getHandlerUsuarios);
router.put('/:id', putHandlerUsuario);
router.delete('/:id', deleteHandlerUsuario);

export default router;
