import eliminarProductosServices from '../../../services/productos/eliminarProductosServices.jsx';
import { eliminarProducto } from '../slices/productosSlice.jsx';

export const eliminarProductosAction = async (dispatch, id) => {
	try {
		const { _id } = await eliminarProductosServices(id);
		dispatch(eliminarProducto(_id));
	} catch (error) {
		console.log(error);
	}
};
