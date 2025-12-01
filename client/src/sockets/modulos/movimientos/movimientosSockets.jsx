// src/sockets/movimientosSockets.js

const movimientosListeners = (socket) => {
	// Escucha cuando se notifica que hay un nuevo movimiento (emitido por otros usuarios)
	socket.on('movimiento:actualizado', (data) => {
		console.log('[Socket] Evento recibido: movimiento:actualizado', data);

		// ✨ AQUI VA TU LOGICA PARA ACTUALIZAR REDUX/CONTEXT/ESTADO LOCAL ✨
		// Por ejemplo, podrías disparar una acción de Redux para añadir el nuevo movimiento a la lista
		// dispatch(actualizarListaDeMovimientos(data));
	});

	// Escucha cuando se notifica que un movimiento ha sido anulado
	socket.on('movimiento:anulado', (data) => {
		console.log('[Socket] Evento recibido: movimiento:anulado', data);

		// ✨ AQUI VA TU LOGICA PARA ACTUALIZAR REDUX/CONTEXT/ESTADO LOCAL ✨
		// dispatch(marcarMovimientoComoAnulado(data._id));
	});
};

export default movimientosListeners;
