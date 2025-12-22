import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerUsuariosServices = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}usuarios`);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerUsuariosServices;
