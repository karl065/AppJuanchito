import { alertInfo, alertSuccess } from '../../../helpers/alertas.jsx';
import reloginServices from '../../../services/auth/reloginServices.jsx';
import obtenerCajasServices from '../../../services/cajas/obtenerCajasServices.jsx';
import { cargarCajaActual } from '../../cajas/slices/cajasSlices.jsx';
import { setLogin } from '../slices/loginSlice.jsx';

// 👉 Se recibe dispatch y navigate
export const reloginAction = async (dispatch, navigate) => {
	try {
		const data = await reloginServices();

		console.log(JSON.stringify(data, null, 2));

		const verificarCajaAbierta = data.caja.filter(
			(caj) => caj.estado === 'abierta'
		);

		const idCaja = verificarCajaAbierta[0]._id;

		const cajaActual = await obtenerCajasServices({
			_id: idCaja,
		});
		dispatch(cargarCajaActual(cajaActual[0]));

		dispatch(setLogin(data));

		alertSuccess(`Bienvenido de nuevo: ${data.nombre}`);

		data.role === 'Mesero' ? navigate('/caja') : navigate('/admin');

		return true;
	} catch (error) {
		console.log(
			'Error relogin action: ',
			JSON.stringify(error.response.data.msg, null, 2)
		);
		alertInfo(error);

		// ⚠️ Si falla → redirecciona al login
		if (navigate) navigate('/');

		return false;
	}
};
