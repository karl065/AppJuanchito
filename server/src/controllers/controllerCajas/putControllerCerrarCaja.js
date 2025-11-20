import cerrarCaja from '../../helpers/caja/cierreCaja.js';

const putControllerCerrarCaja = async (data) => {
	try {
		return await cerrarCaja(data);
	} catch (error) {
		return { error: error.message };
	}
};

export default putControllerCerrarCaja;
