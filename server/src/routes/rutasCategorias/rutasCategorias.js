import express from 'express';
import postHandlerCategorias from '../../handlers/handlerCategorias/postHandlerCategorias.js';
import deleteHandlerCategoria from '../../handlers/handlerCategorias/deleteHandlerCategoria.js';
import putHandlerCategoria from '../../handlers/handlerCategorias/putHandlerCategorias.js';
import getHandlerCategorias from '../../handlers/handlerCategorias/getHandlerCategorias.js';
const router = express.Router();

router.post('/', postHandlerCategorias);
router.delete('/:id', deleteHandlerCategoria);
router.put('/:id', putHandlerCategoria);
router.get('/', getHandlerCategorias);

export default router;
