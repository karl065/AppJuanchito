import deleteControllerProductos from '../../controllers/controllerProductos/deleteControllerProductos.js';

const deleteHandlerProductos = async (req, res) => {
	try {
		const { id } = req.params;

		const productoEliminado = await deleteControllerProductos(id);

		return res.status(200).json(productoEliminado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default deleteHandlerProductos;
