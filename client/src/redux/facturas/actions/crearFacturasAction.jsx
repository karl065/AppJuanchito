import obtenerCajasServices from '../../../services/cajas/obtenerCajasServices.jsx';
import crearFacturasServices from '../../../services/facturas/crearFacturasServices.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';
import { cargarCajaActual } from '../../cajas/slices/cajasSlices.jsx';
import { agregarFactura } from '../slices/facturasSlices.jsx';

export const crearFacturaAction = async (dispatch, factura) => {
	try {
		const data = await crearFacturasServices(factura);

		dispatch(agregarFactura(data[0]));

		const cajaActual = await obtenerCajasServices({ _id: data.caja });

		dispatch(cargarCajaActual(cajaActual[0]));

		emitEvent('factura:creada', data);

		return data;
	} catch (error) {
		console.log(error);
	}
};
