import Productos from '../../models/Productos.js';

const putControllerProductos = async (dataUpdate, id) => {
	try {
		await Productos.findByIdAndUpdate(id, dataUpdate);
		const productoActualizado = await Productos.findById(id).populate(
			'categoria'
		);
		return productoActualizado;
	} catch (error) {
		return error;
	}
};

export default putControllerProductos;
