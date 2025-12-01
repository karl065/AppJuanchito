import { io } from 'socket.io-client';
import server from '../../conexiones/conexiones.jsx';
import registerClientModules from '../../sockets/index.jsx';

const SOCKET_URL = server.api.baseURL;

let socket = null;
let appDispatch = null;

export const setAppDispatch = (dispatch) => {
	appDispatch = dispatch;
};

export const getAppDispatch = () => appDispatch;

export const connectSocket = () => {
	// Inicializa la conexión
	socket = io(SOCKET_URL, {
		withCredentials: true, // Importante para enviar cookies/tokens si tu back lo requiere
	});

	socket.on('connect', () => {
		console.log('✅ Conectado al servidor Socket.io:', socket.id);
		registerClientModules(socket); // Registra los listeners cuando se conecta
	});

	socket.on('disconnect', () => {
		console.log('❌ Desconectado del servidor Socket.io');
	});

	socket.on('connect_error', (error) => {
		console.error('Error de conexión Socket.io:', error.message);
	});
};

// Función de ayuda para emitir eventos desde cualquier parte de la app
export const emitEvent = (event, data) => {
	if (socket && socket.connected) {
		socket.emit(event, data);
	} else {
		console.warn('Socket no conectado. No se pudo emitir el evento:', event);
	}
};

// Función para obtener la instancia del socket si es necesario
export const getSocket = () => socket;
