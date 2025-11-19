import express from 'express';
import getHandlerDispositivos from '../../handlers/handlersDispositivos/getHandlerDispositivo.js';
import deleteHandlerDispositivo from '../../handlers/handlersDispositivos/deleteHandlerDispositivo.js';
const router = express.Router();

router.delete('/:id', deleteHandlerDispositivo);
router.get('/', getHandlerDispositivos);

export default router;
