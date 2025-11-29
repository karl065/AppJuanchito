import crearProductosServices from '../../../services/productos/crearProductosServices.jsx';
import { agregarProducto } from '../slices/productosSlice.jsx';

export const crearProductosAction = async (dispatch, producto) => {
	try {
		const data = await crearProductosServices(producto);
		dispatch(agregarProducto(data));
	} catch (error) {
		console.log(error);
	}
};
