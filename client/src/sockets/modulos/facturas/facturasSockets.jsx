import { actualizarCaja } from '../../../redux/cajas/slices/cajasSlices.jsx';
import { agregarFactura } from '../../../redux/facturas/slices/facturasSlices.jsx';
import { agregarMovimiento } from '../../../redux/movimientos/slices/movimientosSlices.jsx';
import { actualizarProducto } from '../../../redux/productos/slices/productosSlice.jsx';
import { getAppDispatch } from '../../../services/sockets/socketServices.jsx';

const facturasSocketsListeners = (socket) => {
	const dispatch = getAppDispatch();

	if (!dispatch) {
		console.error('❌ No se ha configurado el dispatch para los sockets.');
		return;
	}

	socket.on('factura:agregar_factura', (factura) => {
		for (const prod of factura[0].productos) {
			dispatch(actualizarProducto(prod.producto));
		}
		for (const mov of factura[0].movimientos) {
			dispatch(agregarMovimiento(mov));
		}

		dispatch(actualizarCaja(factura[0].caja));

		dispatch(agregarFactura(factura));
	});
};

export default facturasSocketsListeners;
