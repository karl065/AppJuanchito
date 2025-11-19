import filtroAvanzado from '../../helpers/filtros/filtroAvanzado';
import Movimiento from './../../models/Movimientos';

const getControllerMovimientos = async (query) => {
	try {
		if (query.obtenerTipo) {
			const tiposEnum = await Movimiento.schema.path('tipo').enumValues;
			return tiposEnum;
		}

		const filtro = filtroAvanzado(query, Movimiento.schema);

		const movimientos = await Movimiento.find(
			Object.keys(filtro).length > 0 ? filtro : {}
		)
			.populate('producto')
			.populate('usuario');

		console.log(movimientos);

		return movimientos;
	} catch (error) {
		return error;
	}
};

export default getControllerMovimientos;
