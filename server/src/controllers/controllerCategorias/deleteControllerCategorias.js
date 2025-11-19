import Categorias from './../../models/Categorias.js';

const deleteControllerCategorias = async (id) => {
	try {
		const categoriaEliminada = await Categorias.findById(id);

		await Categorias.findByIdAndDelete(id);

		return categoriaEliminada;
	} catch (error) {
		return error;
	}
};

export default deleteControllerCategorias;
