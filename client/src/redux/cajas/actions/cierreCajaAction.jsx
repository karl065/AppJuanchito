import cierreCajaServices from '../../../services/cajas/cierreCajaServices.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';
import { cargarCajaActual } from '../slices/cajasSlices.jsx';

export const cierreCajasAction = async (dispatch, id, dataUpdate) => {
	try {
		const data = await cierreCajaServices(id, dataUpdate);
		dispatch(cargarCajaActual(null));
		emitEvent('caja:cerrar', data);
		return data;
	} catch (error) {
		console.log(error);
	}
};
