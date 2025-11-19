import postControllerCategorias from '../../controllers/controllerCategorias/postControllerCategorias.js';

const postHandlerCategorias = async (req, res) => {
	try {
		const categoria = req.body;

		const categoriaNueva = await postControllerCategorias(categoria);

		return res.status(200).json(categoriaNueva);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerCategorias;
