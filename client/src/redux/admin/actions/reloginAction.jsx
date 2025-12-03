import { alertSuccess } from '../../../helpers/alertas.jsx';
import reloginServices from '../../../services/auth/reloginServices.jsx';
import obtenerCajasServices from '../../../services/cajas/obtenerCajasServices.jsx';
import { cargarCajaActual } from '../../cajas/slices/cajasSlices.jsx';
import { setLogin } from '../slices/loginSlice.jsx';

// 👉 Se recibe dispatch y navigate
export const reloginAction = async (dispatch, navigate) => {
	try {
		const data = await reloginServices();

		if (data.role === 'Mesero') {
			const verificarCajaAbierta = data.caja.filter(
				(caj) => caj.estado === 'abierta'
			);

			if (verificarCajaAbierta.length > 0) {
				const cajaActual = await obtenerCajasServices({
					_id: verificarCajaAbierta[0]._id,
				});
				dispatch(cargarCajaActual(cajaActual));
			} else {
				dispatch(cargarCajaActual(null));
			}
		}

		dispatch(setLogin(data));

		alertSuccess(`Bienvenido de nuevo: ${data.nombre}`);

		data.role === 'Mesero' ? navigate('/caja') : navigate('/admin');

		return true;
	} catch (error) {
		console.log('Error relogin action: ', error);

		// ⚠️ Si falla → redirecciona al login
		if (navigate) navigate('/');

		return false;
	}
};
