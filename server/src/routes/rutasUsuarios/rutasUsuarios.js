import postHandlerUsuarios from '../../handlers/handlersUsuarios/postHandlerUsuario.js';

import express from 'express';

const router = express.Router();

router.post('/', postHandlerUsuarios);

export default router;
