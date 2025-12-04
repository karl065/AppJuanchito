import { setLogin } from '../slices/loginSlice.jsx';
import { alertInfo, alertSuccess } from '../../../helpers/alertas.jsx';
import { obtenerNombreDispositivo } from '../../../helpers/obtenerNombreDispositivo.jsx';
import login2FAServices from '../../../services/auth/login2FAServices.jsx';

export const login2FAAction = (datos, navigate) => async (dispatch) => {
	try {
		const nombreDispositivo = obtenerNombreDispositivo();

		const data = await login2FAServices({
			userId: datos.userId,
			fingerprint: datos.fingerprint,
			code: datos.code,
			nombreDispositivo,
			recordar: datos.recordar,
		});

		console.log(data);

		dispatch(setLogin(data));
		alertSuccess(`Bienvenido ${data.nombre}`);

		if (data.autorizado) {
			data.role === 'Mesero' ? navigate('/caja') : navigate('/admin');
		}
	} catch (err) {
		alertInfo(err.response?.data || err.message);
	}
};
