import { agregarCaja } from '../../../redux/cajas/slices/cajasSlices.jsx';
import { actualizarProducto } from '../../../redux/productos/slices/productosSlice.jsx';
import { getAppDispatch } from '../../../services/sockets/socketServices.jsx';

const movimientosListeners = (socket) => {
	const dispatch = getAppDispatch();

	if (!dispatch) {
		console.error('❌ No se ha configurado el dispatch para los sockets.');
		return;
	}

	// Escucha el evento 'movimiento:nuevo' que el backend emite (de otros usuarios remotos)
	socket.on('movimiento:nuevo', (data) => {
		dispatch(actualizarProducto(data.producto));
		dispatch(agregarCaja(data));
	});
};

export default movimientosListeners;
