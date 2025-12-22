import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearCategoriasServices = async (nuevaCategoria) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}categorias`,
			nuevaCategoria
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default crearCategoriasServices;
