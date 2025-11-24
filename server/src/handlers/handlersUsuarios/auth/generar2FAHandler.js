import generar2FAController from './../../../controllers/controllersUsuarios/auth/generar2FAController.js';

const generar2FAHandler = async (req, res) => {
	try {
		const { userId } = req.body;
		const data = await generar2FAController(userId);
		return res.status(200).json(data);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default generar2FAHandler;
