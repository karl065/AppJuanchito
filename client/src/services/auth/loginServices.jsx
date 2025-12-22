import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const loginServices = async (userLogin) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}auth/login`,
			userLogin
		);
		return data;
	} catch (error) {
		throw new Error(
			error.response?.data?.error || 'Error de conexión al intentar loguearse'
		);
	}
};

export default loginServices;
