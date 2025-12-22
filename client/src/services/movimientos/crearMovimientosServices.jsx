import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';
import { emitEvent } from '../sockets/socketServices.jsx';

const crearMovimientosServices = async (nuevoMovimiento) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}movimientos`,
			nuevoMovimiento
		);
		emitEvent('movimiento:crear', data[0]);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default crearMovimientosServices;
