import getControllerCategorias from '../../controllers/controllerCategorias/getControllerCategorias.js';

const getHandlerCategorias = async (req, res) => {
	try {
		const categorias = await getControllerCategorias();

		return res.status(200).json(categorias);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerCategorias;
