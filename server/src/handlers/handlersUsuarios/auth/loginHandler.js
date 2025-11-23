import loginController from './../../../controllers/controllersUsuarios/auth/loginController.js';

const loginHandler = async (req, res) => {
	try {
		const respuesta = await loginController(req.body);

		// Si aún no debe emitir token, retornar igual
		if (!respuesta.loginApproved) {
			return res.status(200).json(respuesta);
		}

		// TOKEN viene desde el controller
		const token = respuesta.token;

		// Setear cookie segura
		res.cookie('token', token, {
			httpOnly: true,
			secure: false,
			// secure: true, // Cambiar a false si pruebas en http local
			sameSite: 'none',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		// Devolver usuario sin token
		return res.status(200).json({
			loginApproved: true,
			usuario: respuesta.usuario,
		});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default loginHandler;
