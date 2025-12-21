import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const login2FAServices = async (loginData) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}auth/login-2fa`,
			loginData
		);

		console.log('login2FAServices', data);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default login2FAServices;
