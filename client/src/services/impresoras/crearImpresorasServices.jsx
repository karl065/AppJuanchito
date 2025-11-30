import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearImpresorasServices = async (impresoraNueva) => {
	try {
		console.log(impresoraNueva);
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
