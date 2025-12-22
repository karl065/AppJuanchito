import crearImpresorasServices from '../../../services/impresoras/crearImpresorasServices.jsx';
import { agregarImpresora } from '../slices/impresorasSlices.jsx';

export const crearImpresorasAction = async (dispatch, impresora) => {
	try {
		const token = localStorage.getItem('token');
		const data = await crearImpresorasServices(impresora, token);
		dispatch(agregarImpresora(data));
	} catch (error) {
		console.log(error);
	}
};
