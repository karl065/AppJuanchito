import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearUsuariosServices = async (nuevoUsuario) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}usuarios`,
			nuevoUsuario,
			{
				withCredentials: true,
			}
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default crearUsuariosServices;
