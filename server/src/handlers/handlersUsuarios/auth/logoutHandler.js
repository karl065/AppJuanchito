import logoutController from '../../../controllers/controllersUsuarios/auth/logoutController.js';

const logoutHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const dataUpdate =
			req.body && Object.keys(req.body).length > 0
				? req.body
				: { userStatus: false };

		const logout = await logoutController(dataUpdate, id);

		return res.status(200).json(logout);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default logoutHandler;
