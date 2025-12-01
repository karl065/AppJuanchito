import actualizarStockProducto from '../../helpers/stock/actualizarStockMovimientos.js';
import Movimiento from './../../models/Movimientos.js';
import getControllerMovimientos from './getControllerMovimientos.js';

const postControllerMovimientos = async (movimiento) => {
	try {
		const movimientoNuevo = await Movimiento.create(movimiento)

		await actualizarStockProducto(movimientoNuevo);

		const movimientoAcoplado = await getControllerMovimientos({ _id: movimientoNuevo._id })
		
		console.log(movimientoAcoplado)

		return movimientoAcoplado;
	} catch (error) {
		return error;
	}
};

export default postControllerMovimientos;
