import crearUsuario from '../../controllers/controllersUsuarios/postControllerUsuario.js';

const postHandlerUsuarios = async (req, res) => {
	try {
		const usuario = req.body;
		const usuarioNuevo = await crearUsuario(usuario);

		return res.status(201).json(usuarioNuevo);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerUsuarios;
