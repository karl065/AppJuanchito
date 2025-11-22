import axios from 'axios';
import server from '../../../conexiones/conexiones.jsx';
import { cargarRoles } from '../slices/rolesSlice.jsx';
import { cargarUsuarios } from '../slices/usuariosSlice.jsx';

export const adminFiltrosUsuariosAction = async (dataFilter, dispatch) => {
	try {
		const queryString = Object.keys(dataFilter)
			.map(
				(key) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(dataFilter[key])}`
			)
			.join('&');
		const { data } = await axios.get(
			`${server.api.baseURL}usuarios?${queryString}`
		);

		if (dataFilter.obtenerEnum) {
			dispatch(cargarRoles(data));
		} else {
			dispatch(cargarUsuarios(data));
		}
	} catch (error) {
		console.error('Error en adminFiltrosUsuariosAction:', error);
	}
};
