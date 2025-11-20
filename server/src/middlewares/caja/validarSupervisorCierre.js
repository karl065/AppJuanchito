import Caja from '../../models/Caja.js';

/**
 * Middleware: evita que el supervisor marque "ok" cuando hay descuadre.
 *
 * Mensajes mejorados:
 * - Si falta dinero → indica cuánto falta.
 * - Si sobra dinero → indica cuánto sobra.
 */
const validateSupervisorCierre = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { estado } = req.body;

		// Si no intenta marcar OK, no se valida descuadre
		if (!estado || estado.toLowerCase() !== 'ok') {
			return next();
		}

		if (!id) {
			return res
				.status(400)
				.json({ error: 'El ID de la caja es obligatorio.' });
		}

		const caja = await Caja.findById(id);

		if (!caja) {
			return res.status(404).json({ error: 'Caja no encontrada.' });
		}

		// Debe existir cierre con diferencia calculada
		if (!caja.cierre || typeof caja.cierre.diferencia === 'undefined') {
			return res.status(400).json({
				error:
					'La caja no tiene información de cierre. El cajero debe realizar el cierre antes de la verificación.',
			});
		}

		const diferencia = Number(caja.cierre.diferencia || 0);

		// Si hay descuadre, responder con mensajes más claros
		if (diferencia !== 0) {
			let mensaje = '';

			if (diferencia < 0) {
				// FALTA DINERO
				mensaje = `Hace falta dinero en la caja. El cajero debe ingresar $${Math.abs(
					diferencia
				)} para completar el total.`;
			} else {
				// SOBRA DINERO
				mensaje = `Hay un sobrante en la caja de $${diferencia}. El cajero debe ajustar el valor para que coincida con el sistema.`;
			}

			return res.status(400).json({
				error: 'No se puede marcar "ok". El sistema detectó un descuadre.',
				detalle: mensaje,
				diferencia,
			});
		}

		// Todo cuadra → permitir continuar
		next();
	} catch (err) {
		console.error('Error validateSupervisorCierre:', err);
		return res
			.status(500)
			.json({ error: 'Error validando el cierre de caja.' });
	}
};

export default validateSupervisorCierre;
