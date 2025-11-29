export const calcularResumenMovimientos = (filteredMovimientos) => {
	// Inicialización de contadores para cada tipo de movimiento
	const resumen = {
		entradasTotales: 0,
		salidasTotales: 0,
		neto: 0,
		tipos: {
			entrada: 0,
			salida: 0,
			venta: 0,
			cortesía: 0,
			préstamo_salida: 0,
			préstamo_entrada: 0,
			devolución_entrada: 0,
			devolución_salida: 0,
		},
	};

	filteredMovimientos.forEach((m) => {
		// La cantidad del movimiento puede estar en 'entrada' o 'salida'
		const quantity = (m.entrada || 0) + (m.salida || 0); // Sumamos ambos por si la estructura cambia, pero idealmente solo uno tiene valor.

		// Acumular por tipo específico
		if (Object.prototype.hasOwnProperty.call(resumen.tipos, m.tipo)) {
			resumen.tipos[m.tipo] += quantity;
		}

		// Acumular totales de flujo
		if (m.tipo.includes('entrada')) {
			resumen.entradasTotales += quantity;
		} else if (
			m.tipo.includes('salida') ||
			m.tipo === 'venta' ||
			m.tipo === 'cortesía'
		) {
			resumen.salidasTotales += quantity;
		}
	});

	resumen.neto = resumen.entradasTotales - resumen.salidasTotales;

	return resumen;
};
