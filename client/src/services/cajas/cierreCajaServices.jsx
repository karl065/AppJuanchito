import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const cierreCajaServices = async (id, dataUpdate) => {
	try {
		const { data } = await axios.put(
			`${server.api.baseURL}cajas/cerrar/${id}`,
			dataUpdate
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default cierreCajaServices;
