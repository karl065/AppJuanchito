import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const eliminarMovimientosServices = async (id) => {
	try {
		const { data } = await axios.delete(
			`${server.api.baseURL}movimientos${id}`
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default eliminarMovimientosServices;
