import { Router } from 'express';

import usuarios from './rutasUsuarios/rutasUsuarios.js';

const router = Router();

router.use('/usuarios', usuarios);

export default router;
