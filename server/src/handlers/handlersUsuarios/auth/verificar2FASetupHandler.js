import verificar2FASetupController from './../../../controllers/controllersUsuarios/auth/verificar2FASetupController.js';

const verificar2FASetupHandler = async (req, res) => {
	try {
		const data = await verificar2FASetupController(req.body);

		console.log(
			'2FA Setup Handler - Token generado:',
			data.token ? 'SI' : 'NO'
		);

		const token = data.token;

		if (!token) {
			return res.status(200).json(data.usuario);
		}

		// --- LÓGICA DE COOKIE (Igual que verificar2FALoginHandler) ---

		// Detectar si la petición viene de Capacitor/Móvil
		const isCapacitor =
			req.headers.origin?.includes('capacitor://') ||
			(req.headers.origin?.includes('http://localhost') &&
				req.headers['user-agent']?.includes('Wv'));

		// 🛡️ DETECCIÓN REAL DE HTTPS
		const isSecureConnection =
			req.secure || req.headers['x-forwarded-proto'] === 'https';

		// Configuración Autoadaptable
		let secureSetting;
		let sameSiteSetting;

		if (isCapacitor) {
			// Capacitor/Móvil
			secureSetting = false;
			sameSiteSetting = 'lax';
		} else if (isSecureConnection) {
			// Producción (HTTPS)
			secureSetting = true;
			sameSiteSetting = 'none';
		} else {
			// Desarrollo Local (HTTP)
			secureSetting = false;
			sameSiteSetting = 'lax';
		}

		res.cookie('token', token, {
			httpOnly: true,
			secure: secureSetting,
			sameSite: sameSiteSetting,
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
			path: '/',
		});

		// Debug para ver qué configuración final envió el servidor
		console.log(
			`Cookie Setup enviada: Secure=${secureSetting}, SameSite=${sameSiteSetting} (HTTPS Detectado: ${isSecureConnection})`
		);

		// Retornamos el usuario (data.usuario)
		return res.status(200).json(data.usuario);
	} catch (error) {
		console.error('Error en verificar2FASetupHandler:', error);
		return res.status(400).json({ error: error.message });
	}
};

export default verificar2FASetupHandler;
