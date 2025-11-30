import deleteHandlerImpresoras from '../../handlers/handlerImpresoras/deleteHandlerImpresoras';
import getHandlerImpresoras from '../../handlers/handlerImpresoras/getHandlerImpresoras';
import postHandlerImpresoras from '../../handlers/handlerImpresoras/postHandlerImpresoras';
import putHandlerImpresoras from '../../handlers/handlerImpresoras/putHandlerImpresoras';
import authMiddle from '../../middlewares/auth/authMiddle';

const router = require('express').Router();

router.post('/', authMiddle,postHandlerImpresoras);
router.delete('/:id', authMiddle, deleteHandlerImpresoras);
router.put('/:id', authMiddle, putHandlerImpresoras)
router.get('/', authMiddle, getHandlerImpresoras);

export default router