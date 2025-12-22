import { setLogin } from '../slices/loginSlice.jsx';
import { alertInfo, alertSuccess } from '../../../helpers/alertas.jsx';
import { obtenerNombreDispositivo } from '../../../helpers/obtenerNombreDispositivo.jsx';
import login2FAServices from '../../../services/auth/login2FAServices.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';

export const login2FAAction = async (datos, navigate, dispatch) => {
	try {
		const nombreDispositivo = obtenerNombreDispositivo();

		const data = await login2FAServices({
			userId: datos.userId,
			fingerprint: datos.fingerprint,
			code: datos.code,
			nombreDispositivo,
			recordar: datos.recordar,
		});
		dispatch(setLogin(data));

		// Guardar ID en LocalStorage (NUEVO)
		// Verificamos si data.id o data._id existe antes de guardar
		if (data._id) {
			localStorage.setItem('userId', data._id);
		}

		emitEvent('usuario:login', data);
		alertSuccess(`Bienvenido ${data.nombre}`);

		if (data.autorizado) {
			data.role === 'Mesero' ? navigate('/caja') : navigate('/admin');
		}
	} catch (err) {
		alertInfo(err.response?.data || err.message);
	}
};
