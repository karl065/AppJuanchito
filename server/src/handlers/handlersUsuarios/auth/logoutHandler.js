import logoutController from '../../../controllers/controllersUsuarios/auth/logoutController.js';

const logoutHandler = async (req, res) => {
	try {
		const { id } = req.params;

		const dataUpdate = req.body;

		const logout = await logoutController(dataUpdate, id);

		// limpiar cookie
		res.clearCookie('token', {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		});

		return res.status(200).json(logout);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default logoutHandler;
