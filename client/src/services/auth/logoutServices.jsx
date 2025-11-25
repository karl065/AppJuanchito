import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const logoutServices = async (id, userStatus) => {
	try {
		const { data } = await axios.put(
			`${server.api.baseURL}auth/logout/${id}`,
			userStatus,
			{ withCredentials: true }
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default logoutServices;
