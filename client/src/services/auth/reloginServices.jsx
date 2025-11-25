import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const reloginServices = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}auth/relogin`, {
			withCredentials: true,
		});

		return data;
	} catch (error) {
		throw new Error(error.response.data.error);
	}
};

export default reloginServices;
