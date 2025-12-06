import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const loginServices = async (userLogin) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}auth/login`,
			userLogin,
			{ withCredentials: true }
		);
		return data;
	} catch (error) {
		console.log(error)
		throw new Error(error.response.data.error);
	}
};

export default loginServices;
