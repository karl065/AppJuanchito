import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const actualizarCategoriasServices = async (id, dataUpdate) => {
	try {
		const { data } = await axios.put(
			`${server.api.baseURL}categorias/${id}`,
			dataUpdate,
			{
				withCredentials: true,
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default actualizarCategoriasServices;
