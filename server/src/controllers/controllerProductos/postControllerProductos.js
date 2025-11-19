import putControllerCategorias from '../controllerCategorias/putControllerCategorias.js';
import Productos from './../../models/Productos.js';

const postControllerProductos = async (producto) => {
	try {
		const productoNuevo = await Productos.create(producto);

		const productoCompleto = await Productos.findById(
			productoNuevo._id
		).populate('categoria');

		await putControllerCategorias(productoNuevo, producto.categoria);

		return productoCompleto;
	} catch (error) {
		return error;
	}
};

export default postControllerProductos;
