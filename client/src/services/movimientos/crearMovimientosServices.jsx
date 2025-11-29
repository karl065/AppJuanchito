import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearMovimientosServices = async (nuevoMovimiento) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}movimientos`,
			nuevoMovimiento,
			{
				withCredentials: true,
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default crearMovimientosServices;
