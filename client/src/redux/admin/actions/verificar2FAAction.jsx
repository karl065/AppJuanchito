import { obtenerNombreDispositivo } from '../../../helpers/obtenerNombreDispositivo.jsx';
import verificar2FAServices from '../../../services/auth/verificar2FAServices.jsx';
import { setLogin } from '../slices/loginSlice.jsx';

export const verificar2FAAction = async (verificar, dispatch) => {
	try {
		const nombreDispositivo = obtenerNombreDispositivo();

		verificar.nombreDispositivo = nombreDispositivo;

		console.log(
			'entrada a Verficar2FAAction',
			JSON.stringify(verificar, null, 2)
		);

		const data = await verificar2FAServices(verificar);

		console.log('respuesta Verficar2FAAction', JSON.stringify(data, null, 2));

		dispatch(setLogin(data.ok));
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};
