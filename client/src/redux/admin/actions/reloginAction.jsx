import { alertInfo, alertSuccess } from '../../../helpers/alertas.jsx';
import reloginServices from '../../../services/auth/reloginServices.jsx';
import { cargarCajaActual } from '../../cajas/slices/cajasSlices.jsx';
import { setLogin } from '../slices/loginSlice.jsx';

// 👉 Se recibe dispatch y navigate
export const reloginAction = async (dispatch, navigate) => {
	try {
		const id = localStorage.getItem('userId');

		const data = await reloginServices(id);

		if (data === 'Token no valido') throw new Error(data);

		if (data.caja.length > 0) {
			const verificarCajaAbierta = data.caja.filter(
				(caj) => caj.estado === 'abierta'
			);
			if (verificarCajaAbierta.length > 0) {
				dispatch(cargarCajaActual(verificarCajaAbierta[0]));
			} else {
				dispatch(cargarCajaActual(null));
			}
		}

		dispatch(setLogin(data));

		// Guardar ID en LocalStorage (NUEVO)
		// Verificamos si data.id o data._id existe antes de guardar
		if (data._id) {
			localStorage.setItem('userId', data._id);
		}

		alertSuccess(`Bienvenido de nuevo: ${data.nombre}`);

		data.role === 'Mesero' ? navigate('/caja') : navigate('/admin');

		return true;
	} catch (error) {
		if (
			error.message === 'Token no válido' ||
			error.message === 'Token expirado'
		)
			alertInfo('Sesion expirada, por favor inicie sesion nuevamente');

		// ⚠️ Si falla → redirecciona al login
		if (navigate) navigate('/');

		return false;
	}
};
