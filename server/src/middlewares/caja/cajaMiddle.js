import Caja from '../../models/Caja.js';

const cajaMiddle = async (req, res, next) => {
	try {
		const { usuario } = req.body;

		if (!usuario) {
			return res.status(400).json({ error: 'El usuarioId es obligatorio.' });
		}

		// Buscar si el usuario tiene una caja abierta
		const cajaAbierta = await Caja.findOne({
			usuario,
			estado: 'abierta',
		});

		if (cajaAbierta) {
			return res.status(400).json({
				error:
					'El usuario ya tiene una caja abierta. Debe cerrarla antes de abrir otra.',
				cajaId: cajaAbierta._id,
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
