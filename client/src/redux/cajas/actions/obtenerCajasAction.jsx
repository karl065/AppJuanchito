import obtenerCajasServices from '../../../services/cajas/obtenerCajasServices.jsx';
import { cargarCajas } from '../slices/cajasSlices.jsx';

export const obtenerCajasAction = async (dispatch) => {
	try {
		const data = await obtenerCajasServices();

		dispatch(cargarCajas(data));
	} catch (error) {
		console.log(error);
	}
};
