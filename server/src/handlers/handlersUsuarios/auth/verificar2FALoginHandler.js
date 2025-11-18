import verificar2FALoginController from './../../../controllers/controllersUsuarios/auth/verificar2FALoginController.js';

const verificar2FALoginHandler = async (req, res) => {
	try {
		const data = await verificar2FALoginController(req.body);
		return res.json(data);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default verificar2FALoginHandler;
