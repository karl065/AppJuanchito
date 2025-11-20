import postControllerFacturas from '../../controllers/controllerFacturas/postControllerFacturas.js';
import postControllerMovimientos from './../../controllers/controllerMovimientos/postControllerMovimientos.js';

const procesarVenta = async (dataFactura) => {
	try {
		// Extraemos la info que viene del front
		const { productos, usuario } = dataFactura;

		let movimientosGenerados = [];

		// 1. Crear movimientos por cada producto
		for (const item of productos) {
			const movimientoData = {
				salida: item.cantidad,
				descripcion: `Venta de ${item.cantidad} unds`,
				tipo: 'venta',
				producto: item.producto,
				usuario: usuario,
			};

			const movimientoCreado = await postControllerMovimientos(movimientoData);

			movimientosGenerados.push(movimientoCreado._id);
		}

		// 2. Armar documento final con movimientos
		const facturaCompleta = {
			...dataFactura,
			movimientos: movimientosGenerados,
		};

		// 3. Registrar factura en DB
		const facturaNueva = await postControllerFacturas(facturaCompleta);

		// 4. Retornar factura ya procesada
		return facturaNueva;
	} catch (error) {
		console.error('Error en procesarVenta:', error);
		throw error;
	}
};

export default procesarVenta;
