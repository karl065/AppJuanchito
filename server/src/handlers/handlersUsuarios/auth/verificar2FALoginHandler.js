import verificar2FALoginController from './../../../controllers/controllersUsuarios/auth/verificar2FALoginController.js';

const verificar2FALoginHandler = async (req, res) => {
	try {
		const data = await verificar2FALoginController(req.body);

		console.log('2FA Handler - Token generado:', data.token ? 'SI' : 'NO');

		const token = data.token;

		if (!token) {
			return res.status(200).json(data.usuario);
		}

		// Detectar si la petición viene de Capacitor/Móvil
		// A veces el origin es localhost o file://
		const isCapacitor =
			req.headers.origin?.includes('capacitor://') ||
			(req.headers.origin?.includes('http://localhost') &&
				req.headers['user-agent']?.includes('Wv'));

		// 🛡️ DETECCIÓN REAL DE HTTPS
		// req.secure funciona si tienes 'trust proxy' activado en app.js
		// x-forwarded-proto es el header estándar de balanceadores de carga (Render, AWS, etc)
		const isSecureConnection =
			req.secure || req.headers['x-forwarded-proto'] === 'https';

		// Configuración Autoadaptable
		let secureSetting;
		let sameSiteSetting;

		if (isCapacitor) {
			// Capacitor/Móvil: Suele fallar con Secure/None, mejor usar Lax/False
			secureSetting = false;
			sameSiteSetting = 'lax';
		} else if (isSecureConnection) {
			// Producción (HTTPS): Permite cookies Cross-Origin
			// REGLA DE ORO: Si SameSite='none', Secure TIENE que ser true
			secureSetting = true;
			sameSiteSetting = 'none';
		} else {
			// Desarrollo Local (HTTP):
			// No podemos usar 'none' porque requiere 'secure', y no tenemos 'secure' en HTTP.
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
			`Cookie enviada: Secure=${secureSetting}, SameSite=${sameSiteSetting} (HTTPS Detectado: ${isSecureConnection})`
		);

		console.log(data);

		return res.status(200).json(data.usuario);
	} catch (error) {
		console.error('Error en verificar2FALoginHandler:', error);
		return res.status(400).json({ error: error.message });
	}
};

export default verificar2FALoginHandler;
