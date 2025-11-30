import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const eliminarImpresorasServices = async (id) => {
	try {
		const { data } = await axios.delete(`${server.api.baseURL}eliminar/${id}`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default eliminarImpresorasServices;
