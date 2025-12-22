import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const reloginServices = async (id) => {
	try {
		const config = {
			withCredentials: true,
			params: {},
		};

		if (id) {
			config.params.id = id;
		}
		const { data } = await axios.get(
			`${server.api.baseURL}auth/relogin`,
			config
		);

		return data;
	} catch (error) {
		throw new Error(error.response.data.msg);
	}
};

export default reloginServices;
