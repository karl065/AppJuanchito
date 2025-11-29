import crearFacturasServices from '../../../services/facturas/crearFacturasServices.jsx';
import { agregarFactura } from '../slices/facturasSlices.jsx';

export const crearFacturaAction = async (dispatch, factura) => {
	try {
		const data = await crearFacturasServices(factura);
		dispatch(agregarFactura(data));
	} catch (error) {
		console.log(error);
	}
};
