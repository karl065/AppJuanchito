import verificar2FALoginController from './../../../controllers/controllersUsuarios/auth/verificar2FALoginController.js';

const verificar2FALoginHandler = async (req, res) => {
	try {
		const data = await verificar2FALoginController(req.body);

		const token = data.token;

		const isCapacitor = req.headers.origin?.includes('capacitor://');

		res.cookie('token', token, {
			httpOnly: true,
			secure: !isCapacitor, // Capacitor permite secure:false
			sameSite: isCapacitor ? 'lax' : 'none',
			maxAge: 7 * 24 * 60 * 60 * 1000,
			path: '/',
		});

		return res.status(200).json(data.usuario);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default verificar2FALoginHandler;
