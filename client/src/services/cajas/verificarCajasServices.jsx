import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const actualizarCajasServices = async (id, dataUpdate, token) => {
	try {
		const config = {
			headers: {
				'x-auth-token': token, // Enviamos el token en los headers en lugar de cookies
			},
		};

		const { data } = await axios.put(
			`${server.api.baseURL}cajas/verificarCierre/${id}`,
			dataUpdate,
			config
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default actualizarCajasServices;
