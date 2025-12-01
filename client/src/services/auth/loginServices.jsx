import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const loginServices = async (userLogin) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}auth/login`,
			userLogin,
			{ withCredentials: true }
		);

		console.log(data);
		return data;
	} catch (error) {
		throw new Error(error.response.data.error);
	}
};

export default loginServices;
