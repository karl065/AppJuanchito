import Caja from '../../models/Caja.js';

const verificarCierreCaja = async (id, verificarCierre) => {
	const caja = await Caja.findById(id).populate("usuario", "-password").populate("facturas");
	if (!caja) throw new Error('Caja no encontrada');

	if (!caja.cierre) throw new Error('La caja no tiene cierre registrado');

	caja.resultadoCierre = {
		estado: verificarCierre.resultadoCierre.estado,
		verificadoPor: verificarCierre.resultadoCierre.verificadoPor,
		notas: verificarCierre.resultadoCierre.notas,
	};

	caja.cierre.verificado = true;

	caja.estado = verificarCierre.estado

	await caja.save();
	return caja;
};

export default verificarCierreCaja;
