import Caja from '../../models/Caja.js';

const actualizarCajaEnVenta = async (factura) => {
	try {
		const caja = await Caja.findById(factura.caja);
		if (!caja) throw new Error('Caja no encontrada');

		caja.totalEfectivo += factura.precioVenta || 0;
		caja.totalNequi += factura.detallePago.nequi || 0;
		caja.totalDaviplata += factura.detallePago.daviplata || 0;
		caja.totalVentas += factura.precioVenta +=
			factura.detallePago.nequi + factura.detallePago.daviplata || 0;

		await caja.save();

		return caja;
	} catch (error) {
		throw error;
	}
};

export default actualizarCajaEnVenta;
