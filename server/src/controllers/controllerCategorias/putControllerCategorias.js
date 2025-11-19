import Categorias from '../../models/Categorias.js';

const putControllerCategorias = async (dataUpdate, id) => {
	try {
		if (dataUpdate.categoria) {
			await Categorias.findByIdAndUpdate(id, {
				$push: { productos: dataUpdate._id },
			});
			return true;
		}

		await Categorias.findByIdAndUpdate(id, dataUpdate);
		const categoriaActualizada = await Categorias.findById(id).populate(
			'productos'
		);
		return categoriaActualizada;
	} catch (error) {
		return error;
	}
};

export default putControllerCategorias;
