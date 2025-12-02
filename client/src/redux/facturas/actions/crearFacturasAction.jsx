import obtenerCajasServices from '../../../services/cajas/obtenerCajasServices.jsx';
import crearFacturasServices from '../../../services/facturas/crearFacturasServices.jsx';
import { cargarCajaActual } from '../../cajas/slices/cajasSlices.jsx';
import { agregarFactura } from '../slices/facturasSlices.jsx';

export const crearFacturaAction = async (dispatch, factura) => {
	try {
		const data = await crearFacturasServices(factura);

		dispatch(agregarFactura(data));

		const cajaActual = await obtenerCajasServices({ _id: data.caja });

		dispatch(cargarCajaActual(cajaActual[0]));
		return data;
	} catch (error) {
		console.log(error);
	}
};
