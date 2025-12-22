import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerMovimientosServices = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}movimientos`);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerMovimientosServices;
