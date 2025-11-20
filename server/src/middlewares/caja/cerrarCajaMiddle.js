import Caja from '../../models/Caja.js';

const cerrarCajaMiddle = async (req, res, next) => {
	try {
		const { id } = req.params;
		const caja = await Caja.findById(id);

		if (!caja) {
			return res.status(404).json({ error: 'Caja no encontrada' });
		}

		if (caja.estado === 'cerrada') {
			return res.status(400).json({ error: 'La caja ya está cerrada' });
		}

		next();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export default cerrarCajaMiddle;
