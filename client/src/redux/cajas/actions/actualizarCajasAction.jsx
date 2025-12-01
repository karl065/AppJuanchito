import actualizarCajasServices from '../../../services/cajas/verificarCajasServices.jsx';
import { actualizarCaja } from '../slices/cajasSlices.jsx';

export const actualizarCajasAction = async (dispatch, id, dataUpdate) => {
	try {
		const data = await actualizarCajasServices(id, dataUpdate);
		dispatch(actualizarCaja(data));
	} catch (error) {
		console.log(error);
	}
};
