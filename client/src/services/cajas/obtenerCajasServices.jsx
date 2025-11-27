import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerCajasServices = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}cajas`, {
			withCredentials: true,
		});

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerCajasServices;
