import Productos from './../../models/Productos.js';

const deleteControllerProductos = async (id) => {
	try {
		const productoEliminado = await Productos.findById(id);

		await Productos.findByIdAndDelete(id);

		return productoEliminado;
	} catch (error) {
		return error;
	}
};

export default deleteControllerProductos;
