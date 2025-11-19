import postControllerProductos from '../../controllers/controllerProductos/postControllerProductos.js';

const postHandlerProductos = async (req, res) => {
	try {
		const producto = req.body;

		const productoNuevo = await postControllerProductos(producto);

		return res.status(200).json(productoNuevo);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerProductos;
