import { alertInfo, alertSuccess } from '../../../helpers/alertas.jsx';
import reloginServices from '../../../services/auth/reloginServices.jsx';
import { cargarCajaActual } from '../../cajas/slices/cajasSlices.jsx';
import { setLogin } from '../slices/loginSlice.jsx';
import { actualizarUsuario } from '../slices/usuariosSlice.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';

export const reloginAction = async (dispatch, navigate) => {
	// 1. Obtener el token almacenado
	const token = localStorage.getItem('token');

	try {
		// Validación inicial: Si no hay token, no podemos hacer relogin
		if (!token) {
			localStorage.removeItem('token');
			if (navigate) navigate('/');
			return false;
		}

		// 2. Llamar al servicio enviando el token
		const data = await reloginServices(token);

		// Verificamos si la respuesta trae al usuario (asumiendo estructura { usuario, token? })
		if (data) {
			// --- A. Lógica de Cajas ---
			if (data.caja && data.caja.length > 0) {
				const cajaActual = data.caja.filter((caj) => caj.estado === 'abierta');

				if (cajaActual.length > 0) {
					dispatch(cargarCajaActual(cajaActual[0]));
				} else {
					dispatch(cargarCajaActual(null));
				}
			}

			// --- B. Actualizar Redux ---
			dispatch(setLogin(data));
			dispatch(actualizarUsuario(data));

			// --- D. Reconexión de Sockets ---
			// Importante para volver a unir al usuario a sus salas/eventos
			emitEvent('usuario:login', data);

			data.role === 'Mesero' ? navigate('/caja') : navigate('/admin');
			alertSuccess(`Bienvenido de nuevo: ${data.nombre}`);

			return true;
		} else {
			throw new Error('Respuesta de sesión inválida');
		}
	} catch (error) {
		console.error('Error en relogin:', error);

		// Si el token expiró o es inválido:
		// 1. Limpiamos el almacenamiento local
		localStorage.removeItem('token');
		localStorage.removeItem('usuario');
		localStorage.removeItem('userId');

		// 2. Notificamos al usuario solo si es un error de sesión (no de red)
		const msg = error.message || '';
		if (
			msg.includes('token') ||
			msg.includes('sesión') ||
			msg.includes('expirado')
		) {
			alertInfo('Tu sesión ha expirado, por favor inicia sesión nuevamente.');
		}

		// 3. Redirigimos al login
		if (navigate) navigate('/');

		return false;
	}
};
