import actualizarStockProducto from '../../helpers/stock/actualizarStockMovimientos.js';
import Movimiento from './../../models/Movimientos.js';

const postControllerMovimientos = async (movimiento) => {
	try {
		const movimientoNuevo = await Movimiento.create(movimiento);

		await actualizarStockProducto(movimientoNuevo);

		return movimientoNuevo;
	} catch (error) {
		return error;
	}
};

export default postControllerMovimientos;
