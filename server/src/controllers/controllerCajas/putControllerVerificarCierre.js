import verificarCierreCaja from '../../helpers/caja/verificarCierreCaja.js';

const putControllerVerificarCierre = async (id, dataUpdate) => {
	try {
		const data = await verificarCierreCaja(id, dataUpdate);
		return data;
	} catch (error) {
		return { error: error.message };
	}
};

export default putControllerVerificarCierre;
