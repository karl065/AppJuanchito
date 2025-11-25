import { alertSuccess } from '../../../helpers/alertas.jsx';
import reloginServices from '../../../services/auth/reloginServices.jsx';
import { setLogin } from '../slices/loginSlice.jsx';

// 👉 Se recibe dispatch y navigate
export const reloginAction = async (dispatch, navigate) => {
	try {
		const data = await reloginServices();

		dispatch(setLogin(data));

		alertSuccess(`Bienvenido de nuevo: ${data.nombre}`);

		data.role === 'Mesero' ? navigate('/caja') : navigate('/informes');

		return true;
	} catch (error) {
		console.log('Error relogin action: ', error);

		// ⚠️ Si falla → redirecciona al login
		if (navigate) navigate('/');

		return false;
	}
};
