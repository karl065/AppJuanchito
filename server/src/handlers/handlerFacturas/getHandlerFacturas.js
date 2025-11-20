import getControllerFacturas from '../../controllers/controllerFacturas/getControllerFacturas.js';

const getHandlerFacturas = async (req, res) => {
	try {
		const query = req.query;

		const facturas = await getControllerFacturas(query);

		return res.status(200).json(facturas);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerFacturas;
