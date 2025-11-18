import verificar2FASetupController from './../../../controllers/controllersUsuarios/auth/verificar2FASetupController.js';

const verificar2FASetupHandler = async (req, res) => {
	try {
		const data = await verificar2FASetupController(req.body);
		return res.json({ ok: data });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default verificar2FASetupHandler;
