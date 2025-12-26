import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const reloginServices = async (token) => {
	try {
		const config = {
			headers: {
				'x-auth-token': token, // Enviamos el token en los headers en lugar de cookies
			},
		};

		const { data } = await axios.get(
			`${server.api.baseURL}auth/relogin`,
			config
		);

		return data;
	} catch (error) {
		// Manejo robusto del error
		throw new Error(
			error.response?.data?.msg || 'Error al intentar renovar la sesión'
		);
	}
};

export default reloginServices;
