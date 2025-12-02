import crearCajasServices from '../../../services/cajas/crearCajasServices';
import { agregarCaja, cargarCajaActual } from '../slices/cajasSlices';

export const crearCajasAction = async (dispatch, nuevaCaja) => {
	try {
		const data = await crearCajasServices(nuevaCaja);

		dispatch(agregarCaja(data));
		dispatch(cargarCajaActual(data));
	} catch (error) {
		console.log(error);
	}
};
