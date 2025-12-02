import cierreCajaServices from '../../../services/cajas/cierreCajaServices.jsx';
import { cargarCajaActual } from '../slices/cajasSlices.jsx';

export const cierreCajasAction = async (dispatch, id, dataUpdate) => {
	try {
		const data = await cierreCajaServices(id, dataUpdate);
		dispatch(cargarCajaActual({}));
		return data;
	} catch (error) {
		console.log(error);
	}
};
