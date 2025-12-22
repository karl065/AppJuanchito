import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const actualizarMovimientosServices = async (id, dataUpdate) => {
	try {
		const { data } = await axios.put(
			`${server.api.baseURL}movimientos/${id}`,
			dataUpdate
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default actualizarMovimientosServices;
