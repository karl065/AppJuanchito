import obtenerMovimientosServices from '../../../services/movimientos/obtenerMovimientosServices.jsx';

export const obtenerMovimientosAction = async (dispatch) => {
	try {
		const data = await obtenerMovimientosServices();

		dispatch(obtenerMovimientosAction(data));
	} catch (error) {
		console.log(error);
	}
};
