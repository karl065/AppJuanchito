import { Router } from 'express';

import usuarios from './rutasUsuarios/rutasUsuarios.js';
import dispositivos from './rutasDispositivos/rutasDispositivos.js';
import auth from './rutasAuth/rutasAuth.js';

const router = Router();

router.use('/usuarios', usuarios);
router.use('/auth', auth);
router.use('/dispositivos', dispositivos);

export default router;
