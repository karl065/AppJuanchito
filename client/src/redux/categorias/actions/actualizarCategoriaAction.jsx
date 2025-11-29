import actualizarCategoriasServices from '../../../services/categorias/actualizarCategoriasServices.jsx';
import { actualizarCategoria } from '../slices/categoriasSlice.jsx';

export const actualizarCategoriaAction = async (dispatch, id, categoria) => {
	try {
		const data = await actualizarCategoriasServices(id, categoria);
		dispatch(actualizarCategoria(data));
	} catch (error) {
		console.log(error);
	}
};
