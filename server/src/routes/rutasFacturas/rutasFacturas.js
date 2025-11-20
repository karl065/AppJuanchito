import express from 'express';
import postHandlerFacturas from '../../handlers/handlerFacturas/postHandlerFacturas.js';
import getHandlerFacturas from '../../handlers/handlerFacturas/getHandlerFacturas.js';
import facturaMiddle from '../../middlewares/facturas/facturasMiddle.js';

const router = express.Router();

router.post('/', facturaMiddle, postHandlerFacturas);
// router.delete('/:id', );
// router.put('/:id', )
router.get('/', getHandlerFacturas);

export default router;
