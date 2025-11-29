import crearCategoriasServices from '../../../services/categorias/crearCategoriasServices.jsx';
import { agregarCategoria } from '../slices/categoriasSlice.jsx';

export const crearCategoriaAction = async (dispatch, categoria) => {
	try {
		const data = await crearCategoriasServices(categoria);
		dispatch(agregarCategoria(data));
	} catch (error) {
		console.log(error);
	}
};
