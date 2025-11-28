import obtenerTiposMovimientosServices from '../../../services/movimientos/obtenerTiposMovimientos.services.jsx';
import { cargarTipos } from '../slices/movimientosSlices.jsx';

export const obtenerTiposMovimientosAction = async (dispatch) => {
	try {
		const data = await obtenerTiposMovimientosServices();

		dispatch(cargarTipos(data));
	} catch (error) {
		console.log(error);
	}
};
