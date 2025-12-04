import logoutServices from '../../../services/auth/logoutServices.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';
import { setLogin } from '../slices/loginSlice';

export const logoutAction = async (id, userStatus, dispatch, navigate) => {
	try {
		const data = await logoutServices(id, userStatus);

		emitEvent('usuario:logout', data);

		if (data) {
			dispatch(setLogin({}));
			navigate('/');
		}
	} catch (error) {
		console.log(error);
	}
};
