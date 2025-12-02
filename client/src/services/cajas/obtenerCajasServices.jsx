import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerCajasServices = async (query = {}) => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}cajas`, {
			withCredentials: true,
			params: query,
		});

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerCajasServices;
