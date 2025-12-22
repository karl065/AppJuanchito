import { obtenerNombreDispositivo } from '../../../helpers/obtenerNombreDispositivo.jsx';
import verificar2FAServices from '../../../services/auth/verificar2FAServices.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';
import { setLogin } from '../slices/loginSlice.jsx';

export const verificar2FAAction = async (verificar, dispatch) => {
	try {
		const nombreDispositivo = obtenerNombreDispositivo();

		verificar.nombreDispositivo = nombreDispositivo;

		const data = await verificar2FAServices(verificar);

		dispatch(setLogin(data));
		// Guardar ID en LocalStorage (NUEVO)
		// Verificamos si data.id o data._id existe antes de guardar
		if (data._id) {
			localStorage.setItem('userId', data._id);
		}
		emitEvent('usuario:login', data);
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};
