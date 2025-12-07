import getControllerFacturas from '../../controllers/controllerFacturas/getControllerFacturas.js';
import postControllerFacturas from '../../controllers/controllerFacturas/postControllerFacturas.js';
import postControllerMovimientos from './../../controllers/controllerMovimientos/postControllerMovimientos.js';

const procesarVenta = async (dataFactura) => {
	try {
		// Extraemos la info que viene del front
		const { productos, usuario } = dataFactura;

		console.log(productos)

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

			movimientosGenerados.push(movimientoCreado[0]._id);
		}

		// 2. Armar documento final con movimientos
		const facturaCompleta = {
			...dataFactura,
			movimientos: movimientosGenerados,
		};

		console.log(facturaCompleta)

		// 3. Registrar factura en DB
		const facturaNueva = await postControllerFacturas(facturaCompleta);

		const facturaFull = await getControllerFacturas({ _id: facturaNueva._id });

		// 4. Retornar factura ya procesada
		return facturaFull;
	} catch (error) {
		console.error('Error en procesarVenta:', error);
		throw error;
	}
};

export default procesarVenta;
