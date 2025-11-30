import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerEstadosCierreServices = async () => {
	try {
		const { data } = await axios.get(
			`${server.api.baseURL}cajas?obtenerEstadoCierre=true`,
			{
				withCredentials: true,
			}
		);
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerEstadosCierreServices;
