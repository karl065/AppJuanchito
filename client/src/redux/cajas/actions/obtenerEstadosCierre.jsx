import obtenerEstadosCierreServices from '../../../services/cajas/obtenerEstadosCierreServices.jsx';
import { cargarEstadosCierre } from '../slices/cajasSlices.jsx';

export const obtenerEstadosCierreAction = async (dispatch) => {
	try {
		const data = await obtenerEstadosCierreServices();
		dispatch(cargarEstadosCierre(data));
	} catch (error) {
		console.log(error);
	}
};
