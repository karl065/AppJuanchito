import { Router } from 'express';

import usuarios from './rutasUsuarios/rutasUsuarios.js';
import dispositivos from './rutasDispositivos/rutasDispositivos.js';
import auth from './rutasAuth/rutasAuth.js';
import categorias from './rutasCategorias/rutasCategorias.js';
import productos from './rutasProductos/rutasProductos.js';
import movimientos from './rutasMovimientos/rutasMovimientos.js';

const router = Router();

router.use('/usuarios', usuarios);
router.use('/auth', auth);
router.use('/dispositivos', dispositivos);
router.use('/categorias', categorias);
router.use('/productos', productos);
router.use('/movimientos', movimientos);

export default router;
