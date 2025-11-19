import express from 'express';
import postHandlerMovimientos from '../../handlers/handlerMovimientos/postHandlerMovimientos.js';
import getHandlerMovimientos from '../../handlers/handlerMovimientos/getHandlerMovimientos.js';
const router = express.Router();

router.post('/', postHandlerMovimientos);
router.get('/', getHandlerMovimientos);

export default router;
