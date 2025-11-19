import postControllerMovimientos from '../../controllers/controllerMovimientos/postControllerMovimientos';

const postHandlerMovimientos = async (req, res) => {
	try {
		const movimiento = req.body;

		const movimientoNuevo = await postControllerMovimientos(movimiento);

		return res.status(200).json(movimientoNuevo);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerMovimientos;
