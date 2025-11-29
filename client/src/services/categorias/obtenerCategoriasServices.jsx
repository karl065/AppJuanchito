import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerCategoriasServices = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}categorias`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerCategoriasServices;
