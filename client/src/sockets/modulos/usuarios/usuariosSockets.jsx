import {
	actualizarUsuario,
	agregarUsuario,
	eliminarUsuario,
} from '../../../redux/admin/slices/usuariosSlice';
import { getAppDispatch } from '../../../services/sockets/socketServices.jsx';

const usuariosSocketsListeners = (socket) => {
	const dispatch = getAppDispatch();

	if (!dispatch) {
		console.error('❌ No se ha configurado el dispatch para los sockets.');
		return;
	}

	socket.on('usuario:activo', (usuario) => {
		dispatch(actualizarUsuario(usuario));
	});

	socket.on('usuario:desconectado', (usuario) => {
		dispatch(actualizarUsuario(usuario));
	});

	socket.on('usuario:agregar_usuario', (usuario) => {
		dispatch(agregarUsuario(usuario));
	});

	socket.on('usuario:actualizar_usuario', (usuario) => {
		dispatch(actualizarUsuario(usuario));
	});

	socket.on('usuario:eliminar_usuario', (usuario) => {
		dispatch(eliminarUsuario(usuario));
	});
};

export default usuariosSocketsListeners;
