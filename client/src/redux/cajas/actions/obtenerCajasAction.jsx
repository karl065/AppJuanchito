import obtenerCajasServices from '../../../services/cajas/obtenerCajasServices.jsx';
import { cargarCajas } from '../slices/cajasSlices.jsx';

export const obtenerCajasAction = async (dispatch, query) => {
	try {
		const data = await obtenerCajasServices(query);

		dispatch(cargarCajas(data));
	} catch (error) {
		console.log(error);
	}
};
