import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearProductosServices = async (productoNuevo) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}productos`,
			productoNuevo
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default crearProductosServices;
