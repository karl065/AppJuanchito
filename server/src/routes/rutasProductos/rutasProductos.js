import express from 'express';
import postHandlerProductos from '../../handlers/handlerProductos/postHandlerProductos.js';
import getHandlerProductos from '../../handlers/handlerProductos/getHandlerProductos.js';
import putHandlerProductos from '../../handlers/handlerProductos/putHandlerProductos.js';
import deleteHandlerProductos from '../../handlers/handlerProductos/deleteHandlerProductos.js';
const router = express.Router();

router.post('/', postHandlerProductos);
router.delete('/:id', deleteHandlerProductos);
router.put('/:id', putHandlerProductos);
router.get('/', getHandlerProductos);

export default router;
