import deleteControllerDispositivo from '../../controllers/controllersDispositivos/deleteControllerDispositivos.js';

const deleteHandlerDispositivo = async (req, res) => {
	try {
		const { id } = req.params;

		const dispositivoEliminado = await deleteControllerDispositivo(id);

		return res.status(200).json(dispositivoEliminado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default deleteHandlerDispositivo;
