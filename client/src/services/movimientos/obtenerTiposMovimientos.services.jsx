import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerTiposMovimientosServices = async () => {
	try {
		const { data } = await axios.get(
			`${server.api.baseURL}movimientos?obtenerTipo=true`
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerTiposMovimientosServices;
