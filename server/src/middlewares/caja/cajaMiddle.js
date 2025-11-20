import Caja from '../../models/Caja.js';

const cajaMiddle = async (req, res, next) => {
	try {
		const { usuario, caja } = req.body;

		if (!usuario) {
			return res.status(400).json({ error: 'El usuarioId es obligatorio.' });
		}

		// Buscar si el usuario tiene una caja abierta
		const cajaAbiertaUsuario = await Caja.findOne({
			usuario,
			estado: 'abierta',
		});

		if (cajaAbiertaUsuario) {
			return res.status(400).json({
				error:
					'El usuario ya tiene una caja abierta. Debe cerrarla antes de abrir otra.',
				cajaId: cajaAbiertaUsuario._id,
			});
		}

		// Si existe una caja abierta y no es la misma que se está intentando abrir
		const cajaAbierta = await Caja.findById(caja);
		if (cajaAbierta && cajaAbierta.estado === 'cerrada') {
			return res.status(400).json({
				error: 'La caja ya está cerrada. No se puede asignar al usuario.',
			});
		}

		// Si no hay caja abierta -> continuar al siguiente handler
		next();
	} catch (error) {
		console.error('Error en cajaMiddle:', error);
		return res.status(500).json({ error: 'Error interno del servidor.' });
	}
};

export default cajaMiddle;
