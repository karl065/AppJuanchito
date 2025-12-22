import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const actualizarProductosServices = async (id, dataUpdate) => {
	try {
		const { data } = await axios.put(
			`${server.api.baseURL}productos/${id}`,
			dataUpdate
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default actualizarProductosServices;
