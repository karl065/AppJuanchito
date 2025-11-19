import getControllerProductos from '../../controllers/controllerProductos/getControllerProductos.js';

const getHandlerProductos = async (req, res) => {
	try {
		const filtro = req.query;

		const productos = await getControllerProductos(filtro);

		return res.status(200).json(productos);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerProductos;
