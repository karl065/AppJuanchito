import putControllerVerificarCierre from '../../controllers/controllerCajas/putControllerVerificarCierre.js';

const putHandlerVerificarCierre = async (req, res) => {
	try {
		const { id } = req.params;
		

		const caja = await putControllerVerificarCierre(id, req.body);
		return res.status(200).json(caja);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default putHandlerVerificarCierre;
