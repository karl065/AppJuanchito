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
		console.log(error);
	}
};

export default loginServices;
