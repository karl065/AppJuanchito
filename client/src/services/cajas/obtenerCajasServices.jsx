import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerCajasServices = async (query = {}) => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}cajas`, {
			params: query,
		});

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerCajasServices;
