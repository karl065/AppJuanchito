import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerFacturasServices = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}facturas`);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerFacturasServices;
