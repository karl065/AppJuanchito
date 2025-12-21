import Caja from '../../models/Caja.js';

const facturaMiddle = async (req, res, next) => {
	try {
		const { usuario, caja } = req.body;

		console.log(caja);

		if (!usuario) {
			return res.status(400).json({
				error: 'El usuario es obligatorio para registrar una factura.',
			});
		}

		// Verificar si el usuario tiene una caja abierta
		const cajaAbiertaUsuario = await Caja.findOne({
			usuario,
			estado: 'abierta',
		});

		if (!cajaAbiertaUsuario) {
			return res.status(400).json({
				error:
					'El usuario no tiene una caja abierta. Debe abrir una caja antes de crear una factura.',
			});
		}

		// Si existe una caja abierta y no es la misma que se está intentando abrir
		const cajaAbierta = await Caja.findById(caja);
		if (cajaAbierta.estado === 'cerrada') {
			return res.status(400).json({
				error: 'La caja ya está cerrada. No se puede asignar al usuario.',
			});
		}

		// Pasar el ID de la caja abierta al siguiente handler (opcional, útil)
		req.cajaAbierta = cajaAbierta;

		next();
	} catch (error) {
		console.error('Error en facturaMiddle:', error);
		return res.status(500).json({ error: 'Error interno del servidor.' });
	}
};

export default facturaMiddle;
