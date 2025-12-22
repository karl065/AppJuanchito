import { alertInfo, alertSuccess } from '../../../helpers/alertas.jsx';
import { loadingAction } from '../../app/actions/loadingAction.jsx';
import { setLogin } from '../slices/loginSlice.jsx';
import loginServices from '../../../services/auth/loginServices.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';
import { cargarCajaActual } from '../../cajas/slices/cajasSlices.jsx';
import { actualizarUsuario } from '../slices/usuariosSlice.jsx';

export const loginAction = async (userLogin, dispatch, navigate) => {
	try {
		loadingAction(true, dispatch);

		// Enviamos solo los datos del usuario (correo/password)
		const data = await loginServices(userLogin);

		// 1. Verificación basada en la nueva respuesta del controlador
		// El controlador devuelve { token: "...", usuario: {...} }
		if (data.token && data.usuario) {
			// --- PERSISTENCIA CON LOCALSTORAGE ---
			// Guardamos el token devuelto directamente
			localStorage.setItem('token', data.token);

			// 2. Lógica de Cajas (Mantenida)
			if (data.usuario.caja) {
				const cajaActual = data.usuario.caja.filter(
					(caj) => caj.estado === 'abierta'
				);

				if (cajaActual.length !== 0) {
					dispatch(cargarCajaActual(cajaActual[0]));
				}
			}

			// 3. Actualizar estado de Redux
			dispatch(setLogin(data.usuario));
			dispatch(actualizarUsuario(data.usuario));

			// 4. Emitir evento de Socket (Solo una vez)
			emitEvent('usuario:login', data.usuario);

			// 5. Navegación y Alertas
			alertSuccess(`Bienvenido ${data.usuario.nombre}`);
			data.usuario.role === 'Mesero' ? navigate('/caja') : navigate('/admin');
		} else {
			// Si no viene token o usuario, algo falló aunque no saltara excepción
			throw new Error('Respuesta inválida del servidor');
		}

		loadingAction(false, dispatch);
	} catch (error) {
		// Manejo de errores mejorado
		console.error('Error en loginAction:', error);
		alertInfo(error.message || 'Ocurrió un error al iniciar sesión');
		loadingAction(false, dispatch);
	}
};
