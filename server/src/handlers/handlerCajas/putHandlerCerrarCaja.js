import putControllerCerrarCaja from '../../controllers/controllerCajas/putControllerCerrarCaja.js';

const putHandlerCerrarCaja = async (req, res) => {
	try {
		const cierre = req.body;

		const { id } = req.params;
		cierre._id = id;

		const caja = await putControllerCerrarCaja(cierre);

		return res.status(200).json(caja);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default putHandlerCerrarCaja;
