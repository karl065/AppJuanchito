import axios from 'axios';
import { alertSuccess, alertWarning } from '../../../helpers/Alertas.jsx';
import { loadingAction } from '../../app/actions/loadingAction.jsx';
import server from '../../../conexiones/conexiones.jsx';
import { adminFiltrosUsuariosAction } from './adminFiltrosUsuariosAction';
import { setLogin } from '../slices/loginSlice.jsx';

export const loginAction = async (userLogin, dispatch, navigate) => {
	try {
		const { data } = await axios.post(`${server.api.baseURL}auth`, userLogin);

		if (data) {
			dispatch(setLogin(data));

			adminFiltrosUsuariosAction(
				{ obtenerEnum: true, DBConectada: data.connectedDB },
				dispatch
			);
			data.role === 'View' ? navigate('/view') : navigate('/admin');
			loadingAction(false, dispatch);

			alertSuccess(`Bienvenido ${data.primerNombre}`);
		}
	} catch (error) {
		const { data } = error;
		alertWarning(data);
		loadingAction(false, dispatch);
	}
};
