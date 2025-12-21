import crearFacturasServices from '../../../services/facturas/crearFacturasServices.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';
import { cargarCajaActual } from '../../cajas/slices/cajasSlices.jsx';
import { agregarFactura } from '../slices/facturasSlices.jsx';

export const crearFacturaAction = async (dispatch, factura) => {
	try {
		const data = await crearFacturasServices(factura);

		dispatch(agregarFactura(data[0]));

		dispatch(cargarCajaActual(data.caja));

		emitEvent('factura:creada', data);

		return data;
	} catch (error) {
		console.log(error);
	}
};
