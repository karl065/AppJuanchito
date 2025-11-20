import Caja from '../../models/Caja.js';

const verificarCierreCaja = async (verificarCierre) => {
	const caja = await Caja.findById(verificarCierre.id);
	if (!caja) throw new Error('Caja no encontrada');

	if (!caja.cierre) throw new Error('La caja no tiene cierre registrado');

	const estado = caja.cierre.diferencia === 0 ? 'ok' : 'descuadre';

	caja.resultadoCierre = {
		estado: verificarCierre.estado,
		verificadoPor: verificarCierre.verificadoPor,
		notas: verificarCierre.notas,
	};

	caja.cierre.verificado = true;

	await caja.save();
	return caja;
};

export default verificarCierreCaja;
