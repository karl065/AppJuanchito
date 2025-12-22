import loginController from '../../../controllers/controllersUsuarios/auth/loginController.js';

const loginHandler = async (req, res) => {
	try {
		const respuesta = await loginController(req.body);
		return res.status(200).json(respuesta);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default loginHandler;
