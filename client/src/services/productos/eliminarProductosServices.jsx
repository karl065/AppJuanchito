import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const eliminarProductosServices = async (id) => {
	try {
		const { data } = await axios.delete(
			`${server.api.baseURL}productos/${id}`,
			{
				withCredentials: true,
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default eliminarProductosServices;
