import obtenerCategoriasServices from '../../../services/categorias/obtenerCategoriasServices.jsx';
import { cargarCategorias } from '../slices/categoriasSlice.jsx';

export const obtenerCategoriasAction = async (dispatch) => {
	try {
		const data = await obtenerCategoriasServices();

		dispatch(cargarCategorias(data));
	} catch (error) {
		console.log(error);
	}
};
