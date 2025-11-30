import filtroAvanzado from '../../helpers/filtros/filtroAvanzado.js';
import Movimiento from './../../models/Movimientos.js';

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
			.populate('usuario','-password -__v');

		return movimientos;
	} catch (error) {
		return error;
	}
};

export default getControllerMovimientos;
