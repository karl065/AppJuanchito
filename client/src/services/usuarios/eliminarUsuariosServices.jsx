import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const eliminarUsuariosServices = async (id) => {
	try {
		const { data } = await axios.delete(`${server.api.baseURL}usuarios/${id}`, {
			withCredentials: true,
		});

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default eliminarUsuariosServices;
