import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const eliminarCategoriasServices = async (id) => {
	try {
		const { data } = await axios.delete(
			`${server.api.baseURL}categorias/${id}`,
			{
				withCredentials: true,
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default eliminarCategoriasServices;
