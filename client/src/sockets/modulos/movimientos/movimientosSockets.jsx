import { agregarMovimiento } from '../../../redux/movimientos/slices/movimientosSlices.jsx';
import { getAppDispatch } from '../../../services/sockets/socketServices.jsx';

const movimientosListeners = (socket) => {
	// Escucha el evento 'movimiento:nuevo' que el backend emite (de otros usuarios remotos)
	socket.on('movimiento:nuevo', (data) => {
		const dispatch = getAppDispatch();
		if (dispatch) {
			dispatch(agregarMovimiento(data)); // Actualiza el Redux remoto
		}
	});
};

export default movimientosListeners;
