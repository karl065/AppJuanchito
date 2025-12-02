import filtroAvanzado from '../../helpers/filtros/filtroAvanzado.js';
import Caja from './../../models/Caja.js';

const getControllerCaja = async (query) => {
	try {
		if (query.obtenerEstadoCaja) {
			const estadoEnum = await Caja.schema.path('estado').enumValues;
			return estadoEnum;
		}

		if (query.obtenerEstadoCierre) {
			const estadoCierreEnum = Caja.schema.path(
				'resultadoCierre.estado'
			).enumValues;

			return estadoCierreEnum;
		}

		const filtro = filtroAvanzado(query, Caja.schema);

		const cajas = await Caja.find(Object.keys(filtro).length > 0 ? filtro : {})
			.populate('usuario', '_id nombre role')
			.populate('facturas');

		console.log(cajas);

		return cajas;
	} catch (error) {
		return error;
	}
};

export default getControllerCaja;
