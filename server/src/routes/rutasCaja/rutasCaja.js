import express from 'express';
import cajaMiddle from '../../middlewares/caja/cajaMiddle.js';
import postHandlerCaja from '../../handlers/handlerCajas/postHandlerCaja.js';
import getHandlerCaja from '../../handlers/handlerCajas/getHandlerCaja.js';
import authMiddle from '../../middlewares/auth/authMiddle.js';
import rolesMiddle from '../../middlewares/auth/rolesMiddle.js';
const router = express.Router();

router.post('/', cajaMiddle, postHandlerCaja);
router.get('/', authMiddle, rolesMiddle, getHandlerCaja);

export default router;
