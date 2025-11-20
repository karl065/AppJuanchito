import postControllerCaja from '../../controllers/controllerCajas/postControllerCaja.js';

const postHandlerCaja = async (req, res) => {
	try {
		const caja = req.body;

		const cajaNueva = await postControllerCaja(caja);

		return res.status(200).json(cajaNueva);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerCaja;
