import Categorias from './../../models/Categorias.js';

const postControllerCategorias = async (categoria) => {
	try {
		const categoriaNueva = await Categorias.create(categoria);

		return categoriaNueva;
	} catch (error) {
		return error;
	}
};

export default postControllerCategorias;
