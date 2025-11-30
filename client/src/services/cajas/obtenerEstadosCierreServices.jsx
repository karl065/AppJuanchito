import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerEstadosCierreServices = async () => {
	try {
		const { data } = await axios.get(
			`${server.api.baseURL}cajas?obtenerEstadosCierre=true`,
			{
				withCredentials: true,
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerEstadosCierreServices;
