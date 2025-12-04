import Caja from '../../models/Caja.js';

const cerrarCaja = async (cierreCaja) => {
	try {
		const caja = await Caja.findById(cierreCaja._id)
			.populate({
				path: 'usuario',
				select: '-password',
			})
			.populate({
				path: 'facturas',
			});
		if (!caja) throw new Error('Caja no encontrada');

		if (caja.estado !== 'abierta') {
			throw new Error('La caja ya se encuentra cerrada');
		}

		// Total que debería existir en la caja según cálculos del sistema
		const totalSistema =
			caja.totalEfectivo + caja.totalNequi + caja.totalDaviplata;

		// Diferencia entre conteo físico real y lo esperado por el sistema
		const diferencia =
			cierreCaja.conteoFisico + cierreCaja.traspasoDigital - totalSistema;

		// Actualizamos datos del cierre
		caja.cierre = {
			horaCierre: new Date(),
			conteoFisico: cierreCaja.conteoFisico,
			traspasoDigital: cierreCaja.traspasoDigital,
			totalSistema,
			diferencia,
			verificado: false, // Supervisor aún no ha revisado
		};

		caja.estado = 'cerrada';

		await caja.save();

		return caja;
	} catch (error) {
		throw error;
	}
};

export default cerrarCaja;
