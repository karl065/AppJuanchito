import putControllerCategorias from '../../controllers/controllerCategorias/putControllerCategorias.js';

const putHandlerCategoria = async (req, res) => {
	try {
		const { id } = req.params;

		const dataUpdate = req.body;

		const categoriaActualizada = await putControllerCategorias(dataUpdate, id);

		return res.status(200).json(categoriaActualizada);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default putHandlerCategoria;
