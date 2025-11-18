import usuarioAutenticado from '../../../controllers/controllersUsuarios/auth/usuarioAutenticadoController.js';

const handlerAutenticado = async (req, res) => {
	try {
		const usuario = await usuarioAutenticado(req.usuario.id);

		return res.status(200).json(usuario);
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}
};

export default handlerAutenticado;
