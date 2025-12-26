import filtroAvanzado from '../../helpers/filtros/filtroAvanzado.js';
import Factura from './../../models/Facturas.js';

const getControllerFacturas = async (query) => {
	try {
		if (query.obtenerMetodoPago) {
			const metodoPagoEnum = await Factura.schema.path('metodoPago').enumValues;
			return metodoPagoEnum;
		}

		const filtro = filtroAvanzado(query, Factura.schema);

		const facturas = await Factura.find(
			Object.keys(filtro).length > 0 ? filtro : {}
		)
			.populate({ path: 'usuario', select: '-password' })
			.populate({
				path: 'productos.producto',
				populate: {
					path: 'categoria',
				},
			})
			.populate({
				path: 'movimientos',
				populate: [
					{ path: 'producto' },
					{ path: 'usuario', select: '-password' },
				],
			})
			.populate({
				path: 'caja', // 1. Poblamos 'caja'
				populate: {
					// 2. Dentro de 'caja', poblamos...
					path: 'usuario', // ... el campo 'usuario'
					select: '-password', // 3. Excluyendo el password
				},
				populate: {
					path: 'facturas',
				},
			});

		return facturas;
	} catch (error) {
		return error;
	}
};

export default getControllerFacturas;
