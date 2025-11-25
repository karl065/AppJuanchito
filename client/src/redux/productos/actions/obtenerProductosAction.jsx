import obtenerProductosServices from '../../../services/productos/obtenerProductosServices';
import { cargarProductos } from '../slices/productosSlice';

export const obtenerProductosAction = async (dispatch) => {
	try {
		const data = await obtenerProductosServices();

		dispatch(cargarProductos(data));
	} catch (error) {
		console.log(error);
	}
};
