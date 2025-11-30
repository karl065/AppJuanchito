import obtenerImpresorasServices from '../../../services/impresoras/obtenerImpresorasServices.jsx';
import { cargarImpresoras } from '../slices/impresorasSlice.jsx';

export const obtenerImpresorasAction = async (dispatch) => {
	try {
		const data = await obtenerImpresorasServices();

		dispatch(cargarImpresoras(data));
	} catch (error) {
		console.log(error);
	}
};
