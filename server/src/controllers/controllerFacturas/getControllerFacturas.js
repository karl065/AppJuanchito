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
			.populate('usuario', '_id nombre role')
			.populate('productos.producto', '_id nombre precio')
			.populate('movimientos', '_id salida descripcion tipo');

		return facturas;
	} catch (error) {
		return error;
	}
};

export default getControllerFacturas;
