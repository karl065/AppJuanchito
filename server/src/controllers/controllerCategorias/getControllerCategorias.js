import Categorias from './../../models/Categorias.js';

const getControllerCategorias = async () => {
	try {
		const categorias = await Categorias.find().populate('productos');

		return categorias;
	} catch (error) {
		return error;
	}
};

export default getControllerCategorias;
