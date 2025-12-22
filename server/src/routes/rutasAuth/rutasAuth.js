import { Router } from 'express';

import loginHandler from '../../handlers/handlersUsuarios/auth/loginHandler.js';
import authMiddle from '../../middlewares/auth/authMiddle.js';
import handlerAutenticado from '../../handlers/handlersUsuarios/auth/usuarioAutenticadoHandler.js';
import logoutHandler from '../../handlers/handlersUsuarios/auth/logoutHandler.js';

const router = Router();

// Login - Ahora es paso único (correo + password)
// El handler ya devuelve el token directamente en el JSON
router.post('/login', loginHandler);

// 🔥 Revalidar token (relogin)
// Usa el middleware para validar el header 'x-auth-token'
router.get('/relogin', authMiddle, handlerAutenticado);

// Logout
// Recibe el ID para cambiar el userStatus en la BD
router.put('/logout/:id', logoutHandler);

export default router;
