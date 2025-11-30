import actualizarImpresorasServices from '../../../services/impresoras/actualizarImpresorasServices.jsx';
import { actualizarImpresora } from '../slices/impresorasSlice.jsx';

export const actualizarImpresorasAction = async (dispatch, id, dataUpdate) => {
	try {
		const data = await actualizarImpresorasServices(id, dataUpdate);
		dispatch(actualizarImpresora(data));
	} catch (error) {
		console.log(error);
	}
};
