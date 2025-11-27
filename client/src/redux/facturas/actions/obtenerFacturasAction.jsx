import obtenerFacturasServices from '../../../services/facturas/obtenerFacturasServices.jsx';
import { cargarFacturas } from '../slices/facturasSlices.jsx';

export const obtenerFacturasAction = async (dispatch) => {
	try {
		const data = await obtenerFacturasServices();

		dispatch(cargarFacturas(data));
	} catch (error) {
		console.log(error);
	}
};
