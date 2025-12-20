import { formatearPesos } from './formatearPesos.jsx';

// Función para limpiar texto: Quita tildes y caracteres que la impresora no entiende (evita el "japonés")
const sanitizar = (texto) => {
	if (!texto) return '';
	return texto
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // Elimina tildes (á -> a)
		.replace(/ñ/g, 'n')
		.replace(/Ñ/g, 'N')
		.replace(/[^\x20-\x7E]/g, '') // Solo deja caracteres básicos (ASCII)
		.trim();
};

// Función auxiliar para formatear números SIN el signo pesos para ahorrar espacio
const formatoNumero = (valor) => {
	return formatearPesos(valor).replace('$', '').replace(/\s/g, '').trim();
};

export const generarTextoFactura = (factura) => {
	// ⚠️ AJUSTE CRÍTICO: Bajamos de 32 a 30 caracteres para evitar que se corte el precio a la derecha
	const ANCHO_MAX = 30;
	const separador = '-'.repeat(ANCHO_MAX) + '\n';

	let ticket = '\n';

	// 1. Cabecera (Centrada para 30 caracteres)
	ticket += '          JUANCHITO           \n';
	ticket += '        CANTINA DISCO         \n';
	ticket += separador;

	// Datos generales
	ticket += `Cajero: ${sanitizar(factura.usuario?.nombre).slice(0, 22)}\n`;
	ticket += `Fecha:  ${new Date(factura.createdAt).toLocaleString('es-CO')}\n`;
	ticket += `Ref:    ${factura._id.slice(-8).toUpperCase()}\n`;
	ticket += separador;

	// 2. Detalle de Productos
	// Diseño de columnas (Total 30 chars):
	// Cant (2) + Esp (1) + Nombre (18) + Esp (1) + Total (8) = 30
	// Total de 8 chars permite hasta "9.999.999" o "18.000" holgadamente
	ticket += 'Ct Detalle           Total\n';

	factura.productos.forEach((item) => {
		let nombre = sanitizar(item.producto.nombre);

		// Cantidad: 2 caracteres
		const cant = item.cantidad.toString().padStart(2, '0');

		// Precio: Sin signo pesos, max 8 caracteres
		const total = formatoNumero(item.precioTotalProducto).padStart(8);

		// Nombre: Ajustamos a 18 caracteres dinámicamente
		// Calculamos espacio restante real para el nombre
		const espacioNombre = ANCHO_MAX - cant.length - 1 - total.length - 1;
		const nombreCortado = nombre.padEnd(espacioNombre).slice(0, espacioNombre);

		ticket += `${cant} ${nombreCortado} ${total}\n`;
	});

	ticket += separador;

	// Total Venta (Sin signo pesos para evitar descuadres)
	const labelTotal = 'TOTAL VENTA:';
	const valorTotal = formatoNumero(factura.precioVenta);

	// Alineación derecha
	const espaciosTotal = ' '.repeat(
		Math.max(0, ANCHO_MAX - labelTotal.length - valorTotal.length)
	);

	ticket += `${labelTotal}${espaciosTotal}${valorTotal}\n`;
	ticket += separador;

	// 3. Detalle de Pago
	if (factura.detallePago) {
		if (factura.detallePago.efectivoCliente > 0) {
			const label = 'EFECTIVO:';
			const val = formatoNumero(factura.detallePago.efectivoCliente);
			const esp = ' '.repeat(
				Math.max(0, ANCHO_MAX - label.length - val.length)
			);
			ticket += `${label}${esp}${val}\n`;
		}

		if (factura.detallePago.nequi > 0) {
			const label = 'NEQUI:';
			const val = formatoNumero(factura.detallePago.nequi);
			const esp = ' '.repeat(
				Math.max(0, ANCHO_MAX - label.length - val.length)
			);
			ticket += `${label}${esp}${val}\n`;
		}

		if (factura.detallePago.daviplata > 0) {
			const label = 'DAVIPLATA:';
			const val = formatoNumero(factura.detallePago.daviplata);
			const esp = ' '.repeat(
				Math.max(0, ANCHO_MAX - label.length - val.length)
			);
			ticket += `${label}${esp}${val}\n`;
		}

		if (factura.detallePago.cambio > 0) {
			const label = 'CAMBIO:';
			const val = formatoNumero(factura.detallePago.cambio);
			const esp = ' '.repeat(
				Math.max(0, ANCHO_MAX - label.length - val.length)
			);
			ticket += `${label}${esp}${val}\n`;
		}
	}

	ticket += separador;
	ticket += '    GRACIAS POR SU COMPRA!    \n\n\n';
	return ticket;
};
