import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const logoutServices = async (id, userStatus) => {
	// Obtenemos el token para autorizar la petición
	const token = localStorage.getItem('token');

	try {
		const config = {
			headers: {
				'x-auth-token': token, // Token en headers en vez de cookie
			},
		};

		const { data } = await axios.put(
			`${server.api.baseURL}auth/logout/${id}`,
			userStatus, // body (ej: { userStatus: false })
			config
		);

		return data;
	} catch (error) {
		// Logueamos el error pero permitimos que el flujo continúe en el action
		console.error('Error en servicio logout:', error);
		throw error;
	}
};

export default logoutServices;
