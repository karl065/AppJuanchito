import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerProductosServices = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}productos`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerProductosServices;
