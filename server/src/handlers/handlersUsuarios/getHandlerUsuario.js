import getControllerUsuario from '../../controllers/controllersUsuarios/getControllerUsuario.js';

const getHandlerUsuarios = async (req, res) => {
	try {
		const query = req.query;

		const usuarios = await getControllerUsuario(query);

		return res.status(200).json(usuarios);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerUsuarios;
