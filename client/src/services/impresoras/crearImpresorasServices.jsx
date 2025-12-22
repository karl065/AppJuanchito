import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearImpresorasServices = async (impresoraNueva, token) => {
	try {
		const config = {
			headers: {
				'x-auth-token': token, // Enviamos el token en los headers en lugar de cookies
			},
		};

		const { data } = await axios.post(
			`${server.api.baseURL}impresoras`,
			impresoraNueva,
			config
		);
		console.log(JSON.stringify('Services ', data, null, 2));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default crearImpresorasServices;
