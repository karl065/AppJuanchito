import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerRolesServices = async () => {
	try {
		const { data } = await axios.get(
			`${server.api.baseURL}usuarios?obtenerRoles=true`
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerRolesServices;
