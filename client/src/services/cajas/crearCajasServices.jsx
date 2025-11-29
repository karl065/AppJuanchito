import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearCajasServices = async (nuevaCaja) => {
	try {
		const { data } = await axios.post(`${server.api.baseURL}cajas`, nuevaCaja, {
			withCredentials: true,
		});

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default crearCajasServices;
