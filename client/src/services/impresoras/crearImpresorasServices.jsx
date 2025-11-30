import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearImpresorasServices = async (impresoraNueva) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}impresoras`,
			impresoraNueva,
			{
				withCredentials: true,
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default crearImpresorasServices;
