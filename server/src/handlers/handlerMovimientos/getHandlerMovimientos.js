import getControllerMovimientos from '../../controllers/controllerMovimientos/getControllerMovimientos.js';

const getHandlerMovimientos = async (req, res) => {
	try {
		const query = req.query;

		const movimientos = await getControllerMovimientos(query);

		return res.status(200).json(movimientos);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerMovimientos;
