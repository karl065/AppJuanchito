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

		console.log(filtro)

		const cajas = await Caja.find(Object.keys(filtro).length > 0 ? filtro : {})
			.populate({
				path: 'usuario',
				select: '-password',
			})
			.populate({
				path: 'facturas',
			});

		console.log(cajas)

		return cajas;
	} catch (error) {
		return error;
	}
};

export default getControllerCaja;
