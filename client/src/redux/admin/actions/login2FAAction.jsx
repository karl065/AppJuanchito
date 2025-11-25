import { setLogin } from '../slices/loginSlice.jsx';
import { alertSuccess, alertWarning } from '../../../helpers/alertas.jsx';
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

		dispatch(setLogin(data));
		alertSuccess(`Bienvenido ${data.nombre}`);

		if (data.autorizado) navigate('/admin');
	} catch (err) {
		alertWarning(err.response?.data || err.message);
	}
};
