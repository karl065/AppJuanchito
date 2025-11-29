import obtenerProductosServices from '../../../services/productos/obtenerProductosServices.jsx';
import { cargarProductos } from '../slices/productosSlice.jsx';

export const obtenerProductosAction = async (dispatch) => {
	try {
		const data = await obtenerProductosServices();

		dispatch(cargarProductos(data));
	} catch (error) {
		console.log(error);
	}
};
