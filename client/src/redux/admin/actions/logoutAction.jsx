import logoutServices from '../../../services/auth/logoutServices.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';
import { setLogin } from '../slices/loginSlice.jsx';

export const logoutAction = async (id, userStatus, dispatch, navigate) => {
	// Función helper para limpiar todo rastro de sesión
	const cleanSession = () => {
		dispatch(setLogin({})); // Limpiar estado de Redux

		// Limpiar LocalStorage completo
		localStorage.removeItem('token');

		// Redirección
		if (navigate) navigate('/');
	};

	try {
		// 1. Intentar notificar al backend
		const data = await logoutServices(id, userStatus);

		// 2. Emitir evento de desconexión por Socket
		emitEvent('usuario:logout', data);

		// 3. Limpiar sesión exitosamente
		if (data) {
			cleanSession();
		}
	} catch (error) {
		console.error('Error al cerrar sesión en servidor:', error);

		// ⚠️ IMPORTANTE: Incluso si falla el backend (ej. sin internet),
		// debemos cerrar la sesión localmente para el usuario.
		cleanSession();
	}
};
