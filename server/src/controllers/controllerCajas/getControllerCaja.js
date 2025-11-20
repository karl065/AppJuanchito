import filtroAvanzado from '../../helpers/filtros/filtroAvanzado.js';
import Caja from './../../models/Caja.js';

const getControllerCaja = async (query) => {
	try {
		if (query.obtenerEstadoCaja) {
			const estadoEnum = await Caja.schema.path('estado').enumValues;
			return estadoEnum;
		}

		const filtro = filtroAvanzado(query, Caja.schema);

		const cajas = await Caja.find(Object.keys(filtro).length > 0 ? filtro : {})
			.populate('usuario', '_id nombre role')
			.populate('facturas');

		return cajas;
	} catch (error) {
		return error;
	}
};

export default getControllerCaja;
