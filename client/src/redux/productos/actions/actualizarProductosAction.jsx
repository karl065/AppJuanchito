import actualizarProductosServices from '../../../services/productos/actualizarProductosServices.jsx';
import { actualizarProducto } from '../slices/productosSlice.jsx';

export const actualizarProductosAction = async (dispatch, id, dataUpdate) => {
	try {
		const data = await actualizarProductosServices(id, dataUpdate);
		dispatch(actualizarProducto(data));
	} catch (error) {
		console.log(error);
	}
};
