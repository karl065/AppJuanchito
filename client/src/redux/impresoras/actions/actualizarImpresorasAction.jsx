import actualizarImpresorasServices from '../../../services/impresoras/actualizarImpresorasServices.jsx';
import { actualizarImpresora } from '../slices/impresorasSlice.jsx';

export const actualizarImpresorasAction = async (dispatch, id, dataUpdate) => {
	try {
		const token = localStorage.getItem('token');

		const data = await actualizarImpresorasServices(id, dataUpdate, token);
		dispatch(actualizarImpresora(data));
	} catch (error) {
		console.log(error);
	}
};
