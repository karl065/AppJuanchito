import Dispositivos from './../../models/DispositivosConfiables.js';
import Usuarios from './../../models/Usuarios.js';

const deleteControllerDispositivo = async (id) => {
	try {
		// 1️⃣ Buscar el dispositivo primero
		const dispositivo = await Dispositivos.findById(id);
		if (!dispositivo) throw new Error('Dispositivo no encontrado');

		const userId = dispositivo.userId;

		// 2️⃣ Eliminar referencia del usuario
		if (userId) {
			await Usuarios.findByIdAndUpdate(
				userId,
				{ $pull: { dispositivos: id } },
				{ new: true }
			);
		}

		// 3️⃣ Eliminar el dispositivo de la DB
		await Dispositivos.findByIdAndDelete(id);

		// 4️⃣ (Opcional) devolverlo para confirmar
		return dispositivo;
	} catch (error) {
		throw new Error(error.message);
	}
};

export default deleteControllerDispositivo;
