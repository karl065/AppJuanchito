import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearFacturasServices = async (nuevaFactura) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}facturas`,
			nuevaFactura,
			{
				withCredentials: true,
			}
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default crearFacturasServices;
