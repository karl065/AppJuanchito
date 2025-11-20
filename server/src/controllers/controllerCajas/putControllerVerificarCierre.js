import verificarCierreCaja from '../../helpers/caja/verificarCierreCaja.js';

const putControllerVerificarCierre = async (data) => {
	try {
		return await verificarCierreCaja(data);
	} catch (error) {
		return { error: error.message };
	}
};

export default putControllerVerificarCierre;
