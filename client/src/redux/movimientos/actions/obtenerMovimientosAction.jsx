import obtenerMovimientosServices from '../../../services/movimientos/obtenerMovimientosServices.jsx';
import { cargarMovimientos } from '../slices/movimientosSlices.jsx';

export const obtenerMovimientosAction = async (dispatch) => {
	try {
		const data = await obtenerMovimientosServices();

		dispatch(cargarMovimientos(data));
	} catch (error) {
		console.log(error);
	}
};
