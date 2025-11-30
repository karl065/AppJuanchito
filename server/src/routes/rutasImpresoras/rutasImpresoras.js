import deleteHandlerImpresoras from '../../handlers/handlerImpresoras/deleteHandlerImpresoras.js';
import getHandlerImpresoras from '../../handlers/handlerImpresoras/getHandlerImpresoras.js';
import postHandlerImpresoras from '../../handlers/handlerImpresoras/postHandlerImpresoras.js';
import putHandlerImpresoras from '../../handlers/handlerImpresoras/putHandlerImpresoras.js';
import authMiddle from '../../middlewares/auth/authMiddle.js';
const router = express.Router();

router.post('/', authMiddle,postHandlerImpresoras);
router.delete('/:id', authMiddle, deleteHandlerImpresoras);
router.put('/:id', authMiddle, putHandlerImpresoras)
router.get('/', authMiddle, getHandlerImpresoras);

export default router