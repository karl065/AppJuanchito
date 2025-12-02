import crearFacturasServices from '../../../services/facturas/crearFacturasServices.jsx';
import { actualizarCajaActual } from '../../cajas/slices/cajasSlices.jsx';
import { agregarFactura } from '../slices/facturasSlices.jsx';

export const crearFacturaAction = async (dispatch, factura) => {
	try {
		const data = await crearFacturasServices(factura);

		dispatch(agregarFactura(data));
		dispatch(actualizarCajaActual(data));
		return data;
	} catch (error) {
		console.log(error);
	}
};
