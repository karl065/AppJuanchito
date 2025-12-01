import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const actualizarCajasServices = async (id, dataUpdate) => {
	try {
		console.log(dataUpdate);
		const { data } = await axios.put(
			`${server.api.baseURL}cajas/verificarCierre/${id}`,
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

export default actualizarCajasServices;
