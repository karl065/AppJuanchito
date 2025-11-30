import actualizarCajasServices from '../../../services/cajas/actualizarCajasServices.jsx';
import { actualizarCaja } from '../slices/cajasSlices.jsx';

export const actualizarCajasAction = async (dispatch, id, dataUpdate) => {
	try {
		console.log(dataUpdate);
		const data = await actualizarCajasServices(id, dataUpdate);
		dispatch(actualizarCaja(data));
	} catch (error) {
		console.log(error);
	}
};
