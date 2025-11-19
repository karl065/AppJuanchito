import getControllerDispositivo from '../../controllers/controllersDispositivos/getControllerDispositivos.js';

const getHandlerDispositivos = async (req, res) => {
	try {
		const query = req.query;

		const dispositivos = await getControllerDispositivo(query);

		return res.status(200).json(dispositivos);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerDispositivos;
