import { formatearPesos } from './formatearPesos.jsx';
import { generarLogoBinario } from './generarLogoBinario.jsx';

export const generarTextoFactura = (factura) => {
	const LOGO_COMMAND = generarLogoBinario();
	const separador = '--------------------------------\n';
	let ticket = '\n';

	// 1. Cabecera (Incluye Logo)
	ticket += LOGO_COMMAND; // <-- INSERTAMOS EL LOGO BINARIO AQUÍ
	ticket += '        JUANCHITO       \n';
	ticket += '         CANTINA DISCO       \n';
	ticket += separador;
	ticket += `Cajero: ${factura.usuario?.nombre}\n`;
	ticket += `Fecha:  ${new Date(factura.createdAt).toLocaleString('es-CO')}\n`;
	ticket += `Ref:    ${factura._id.slice(-8).toUpperCase()}\n`;
	ticket += separador;

	// 2. Detalle de Productos
	ticket += 'Cant. Producto         Total\n';
	factura.productos.forEach((item) => {
		const nombre = item.producto.nombre.padEnd(20).slice(0, 20);
		const total = formatearPesos(item.precioTotalProducto).padStart(8);
		ticket += `${item.cantidad.toString().padEnd(5)} ${nombre} ${total}\n`;
	});

	ticket += separador;
	ticket += `TOTAL VENTA: ${formatearPesos(factura.precioVenta).padStart(
		20
	)}\n`;
	ticket += separador;

	// 3. Detalle de Pago
	if (factura.detallePago) {
		if (factura.detallePago.efectivoCliente > 0) {
			ticket += `EFECTIVO:    ${formatearPesos(
				factura.detallePago.efectivoCliente
			).padStart(20)}\n`;
		}
		if (factura.detallePago.cambio > 0) {
			ticket += `CAMBIO:      ${formatearPesos(
				factura.detallePago.cambio
			).padStart(20)}\n`;
		}
	}

	ticket += separador;
	ticket += 'GRACIAS POR SU COMPRA!\n\n\n';
	return ticket;
};
