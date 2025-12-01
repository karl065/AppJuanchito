import crearMovimientosServices from '../../../services/movimientos/crearMovimientosServices.jsx';
import { agregarMovimiento } from '../slices/movimientosSlices.jsx';

export const crearMovimientosAction = async (dispatch, nuevoMovimiento) => {
	try {
		const data = await crearMovimientosServices(nuevoMovimiento);
		console.log('Action: ', data);
		dispatch(agregarMovimiento(data));
	} catch (error) {
		console.error(error);
	}
};
