import {
	actualizarCaja,
	agregarCaja,
} from '../../../redux/cajas/slices/cajasSlices.jsx';
import { getAppDispatch } from '../../../services/sockets/socketServices.jsx';

const cajaListeners = (socket) => {
	const dispatch = getAppDispatch();

	if (!dispatch) {
		console.error('❌ No se ha configurado el dispatch para los sockets.');
		return;
	}

	// Escucha el evento que el BACKEND emite cuando alguien abre una caja
	socket.on('caja:nueva', (data) => {
		dispatch(agregarCaja(data));
	});

	// Escucha cuando un cajero cierra su caja
	socket.on('caja:cierreEnviado', (data) => {
		dispatch(actualizarCaja(data));
	});

	// Escucha cuando un supervisor valida un cierre
	socket.on('caja:verificacionActualizada', (data) => {
		console.log('En socket0:', data);
		dispatch(actualizarCaja(data));
	});
};

export default cajaListeners;
