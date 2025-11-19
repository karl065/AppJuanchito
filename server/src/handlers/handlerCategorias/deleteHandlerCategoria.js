import deleteControllerCategorias from '../../controllers/controllerCategorias/deleteControllerCategorias.js';

const deleteHandlerCategoria = async (req, res) => {
	try {
		const { id } = req.params;

		const categoriaEliminada = await deleteControllerCategorias(id);

		return res.status(200).json(categoriaEliminada);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default deleteHandlerCategoria;
