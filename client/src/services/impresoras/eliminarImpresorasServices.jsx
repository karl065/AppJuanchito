import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const eliminarImpresorasServices = async (id, token) => {
	try {
		const config = {
			headers: {
				'x-auth-token': token, // Enviamos el token en los headers en lugar de cookies
			},
		};

		const { data } = await axios.delete(
			`${server.api.baseURL}eliminar/${id}`,
			config
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default eliminarImpresorasServices;
