import { Router } from 'express';

import usuarios from './rutasUsuarios/rutasUsuarios.js';
import auth from './rutasAuth/rutasAuth.js';
import categorias from './rutasCategorias/rutasCategorias.js';
import productos from './rutasProductos/rutasProductos.js';
import movimientos from './rutasMovimientos/rutasMovimientos.js';
import facturas from './rutasFacturas/rutasFacturas.js';
import cajas from './rutasCaja/rutasCaja.js';
import impresoras from './rutasImpresoras/rutasImpresoras.js';

const router = Router();

router.use('/usuarios', usuarios);
router.use('/auth', auth);
router.use('/categorias', categorias);
router.use('/productos', productos);
router.use('/movimientos', movimientos);
router.use('/facturas', facturas);
router.use('/cajas', cajas);
router.use('/impresoras', impresoras);

export default router;
