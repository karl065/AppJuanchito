import Caja from './../../models/Caja.js';
import Usuarios from './../../models/Usuarios.js';

const postControllerCaja = async (datos) => {
	try {
		// Crear la caja
		const cajaNueva = await Caja.create(datos);

		// Asociarlo al usuario
		await Usuarios.findByIdAndUpdate(datos.usuario, {
			$push: { caja: cajaNueva._id },
		});

		// Retornar la caja creada
		return cajaNueva;
	} catch (error) {
		return error;
	}
};

export default postControllerCaja;
