import { Router } from 'express';

import loginHandler from '../../handlers/handlersUsuarios/auth/loginHandler.js';

import generar2FAHandler from '../../handlers/handlersUsuarios/auth/generar2FAHandler.js';
import verificar2FASetupHandler from '../../handlers/handlersUsuarios/auth/verificar2FASetupHandler.js';
import verificar2FALoginHandler from '../../handlers/handlersUsuarios/auth/verificar2FALoginHandler.js';
import authMiddle from '../../middlewares/auth/authMiddle.js';
import handlerAutenticado from '../../handlers/handlersUsuarios/auth/usuarioAutenticadoHandler.js';
import logoutHandler from '../../handlers/handlersUsuarios/auth/logoutHandler.js';

const router = Router();

// Login - paso 1 (correo + password + fingerprint)
router.post('/login', loginHandler);

// Generar secret + QR (se llama cuando login devuelve require2FASetup)
router.post('/generar-2fa', generar2FAHandler);

// Verificar código inicial y activar 2FA (setup)
router.post('/verificar-2fa-setup', verificar2FASetupHandler);

// Login - paso 2 (validar TOTP y opcionalmente "recordar dispositivo")
router.post('/login-2fa', verificar2FALoginHandler);

// 🔥 Nueva ruta: Revalidar token (relogin)
router.get('/relogin', authMiddle, handlerAutenticado);

// Logout
router.put('/logout/:id', logoutHandler);

export default router;
