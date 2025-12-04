import crearMovimientosServices from '../../../services/movimientos/crearMovimientosServices.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';
import { agregarMovimiento } from '../slices/movimientosSlices.jsx';

export const crearMovimientosAction = async (dispatch, nuevoMovimiento) => {
	try {
		const data = await crearMovimientosServices(nuevoMovimiento);
		dispatch(agregarMovimiento(data[0]));
		emitEvent('movimiento:crear', data[0]);
	} catch (error) {
		console.error(error);
	}
};
