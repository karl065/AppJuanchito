import { Router } from 'express';

import usuarios from './rutasUsuarios/rutasUsuarios.js';
import auth from './rutasAuth/rutasAuth.js';

const router = Router();

router.use('/usuarios', usuarios);
router.use('/auth', auth);

export default router;
