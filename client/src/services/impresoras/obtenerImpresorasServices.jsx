import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerImpresorasServices = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}impresoras`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerImpresorasServices;
