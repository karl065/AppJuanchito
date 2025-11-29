import crearCajasServices from '../../../services/cajas/crearCajasServices';
import { agregarCaja } from '../slices/cajasSlices';

export const crearCajasAction = async (dispatch, nuevaCaja) => {
	try {
		const data = await crearCajasServices(nuevaCaja);
		dispatch(agregarCaja(data));
	} catch (error) {
		console.log(error);
	}
};
