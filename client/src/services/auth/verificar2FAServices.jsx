import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const verificar2FAServices = async (verificar) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}auth/verificar-2fa-setup`,
			verificar,
			{ withCredentials: true }
		);

		console.log('Data en verificar2FAServices', data);

		return data;
	} catch (error) {
		throw new Error(error.response.data.error);
	}
};

export default verificar2FAServices;
