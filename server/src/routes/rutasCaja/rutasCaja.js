import express from 'express';
import cajaMiddle from '../../middlewares/caja/cajaMiddle.js';
import postHandlerCaja from '../../handlers/handlerCajas/postHandlerCaja.js';
import getHandlerCaja from '../../handlers/handlerCajas/getHandlerCaja.js';
import authMiddle from '../../middlewares/auth/authMiddle.js';
import rolesMiddle from '../../middlewares/auth/rolesMiddle.js';
import cerrarCajaMiddle from '../../middlewares/caja/cerrarCajaMiddle.js';
import putHandlerCerrarCaja from '../../handlers/handlerCajas/putHandlerCerrarCaja.js';
import putHandlerVerificarCierre from '../../handlers/handlerCajas/putHandlerVerificarCierre.js';
import validateSupervisorCierre from '../../middlewares/caja/validarSupervisorCierre.js';
const router = express.Router();

router.post('/', cajaMiddle, postHandlerCaja);
router.get('/', authMiddle, getHandlerCaja);
router.put('/cerrar/:id', cerrarCajaMiddle, putHandlerCerrarCaja);
router.put(
	'/verificarCierre/:id',
	authMiddle,
	rolesMiddle,
	validateSupervisorCierre,
	putHandlerVerificarCierre
);

export default router;
