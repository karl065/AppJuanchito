import crearImpresorasServices from '../../../services/impresoras/crearImpresorasServices.jsx';
import { agregarImpresora } from '../slices/impresorasSlice.jsx';

export const crearImpresorasAction = async (dispatch, impresora) => {
	try {
		const data = await crearImpresorasServices(impresora);
		dispatch(agregarImpresora(data));
	} catch (error) {
		console.log(error);
	}
};
