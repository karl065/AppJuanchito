import Caja from '../../models/Caja.js';

const actualizarCajaEnVenta = async (factura) => {
	try {
		const caja = await Caja.findById(factura.caja)
			.populate({
				path: 'usuario',
				select: '-password',
			})
			.populate({
				path: 'facturas',
			});
		if (!caja) throw new Error('Caja no encontrada');

		caja.totalEfectivo +=
			factura.detallePago.efectivoCliente - factura.detallePago.cambio || 0;
		caja.totalNequi += factura.detallePago.nequi || 0;
		caja.totalDaviplata += factura.detallePago.daviplata || 0;
		caja.totalVentas += factura.precioVenta || 0;

		await caja.save();

		console.log(caja);

		return caja;
	} catch (error) {
		throw error;
	}
};

export default actualizarCajaEnVenta;
