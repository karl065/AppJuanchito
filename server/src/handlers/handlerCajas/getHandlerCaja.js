import getControllerCaja from '../../controllers/controllerCajas/getControllerCaja.js';

const getHandlerCaja = async (req, res) => {
	try {
		const query = req.query;
		const cajas = await getControllerCaja(query);

		console.log(cajas);

		return res.status(200).json(cajas);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerCaja;
