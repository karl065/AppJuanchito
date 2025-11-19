import putControllerProductos from '../../controllers/controllerProductos/putControllerProductos.js';

const putHandlerProductos = async (req, res) => {
	try {
		const { id } = req.params;

		const dataUpdate = req.body;

		const productoActualizado = await putControllerProductos(dataUpdate, id);

		return res.status(200).json(productoActualizado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default putHandlerProductos;
