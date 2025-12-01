// Importa tus funciones de Redux/Contexto aquí si es necesario
// import { dispatchCajaActualizada, dispatchCierreEnviado } from '../redux/cajas/actions';

const movimiententoListeners = (socket) => {
	// Escucha el evento que el BACKEND emite cuando alguien abre una caja
	socket.on('movimiento:actualizado', (data) => {
		console.log('Evento recibido: caja:actualizada', data);
		// Llama a tu función de Redux para actualizar el estado global de la app
		// dispatchCajaActualizada(data);
		// alert('¡Una caja ha sido abierta/actualizada!');
	});

	// Escucha cuando un cajero cierra su caja
	socket.on('caja:cierreEnviado', (data) => {
		console.log('Evento recibido: caja:cierreEnviado', data);
		// dispatchCierreEnviado(data);
		// alert('¡Un cierre de caja ha sido enviado para verificación!');
	});

	// Escucha cuando un supervisor valida un cierre
	socket.on('caja:verificacionActualizada', (data) => {
		console.log('Evento recibido: caja:verificacionActualizada', data);
		// Actualiza el estado de verificación en tu frontend
	});
};

export default movimiententoListeners;
