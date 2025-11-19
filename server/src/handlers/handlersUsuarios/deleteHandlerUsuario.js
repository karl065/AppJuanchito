import deleteControllerUsuario from '../../controllers/controllersUsuarios/deleteControllerUsuario.js';

const deleteHandlerUsuario = async (req, res) => {
	try {
		const { id } = req.params;

		const usuarioEliminado = await deleteControllerUsuario(id);

		return res.status(200).json(usuarioEliminado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default deleteHandlerUsuario;
