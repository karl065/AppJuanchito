import { diaEnPeriodo } from './diaEnPeriodo.jsx';

export const calcularAnalisisDeStock = (safeProductos, period) => {
	const totalStockValue = safeProductos.reduce(
		(sum, p) => sum + p.stock * (p.precio || 0),
		0
	);
	const totalStockUnits = safeProductos.reduce(
		(sum, p) => sum + (p.stock || 0),
		0
	);
	const lowStockItems = safeProductos.filter((p) => p.stock < 10).length;

	// 🚨 NUEVA LÓGICA: Iterar sobre los movimientos anidados en cada producto
	// para calcular flujos de cortesías y préstamos en el período seleccionado.
	let cortesiasPeriodo = 0;
	let prestamosSalidaPeriodo = 0;
	let prestamosEntradaPeriodo = 0;

	safeProductos.forEach((p) => {
		if (p.movimientos && Array.isArray(p.movimientos)) {
			p.movimientos.forEach((m) => {
				// Verificar si el movimiento cae en el período seleccionado (Turno/Semana/Mes)
				if (m.createdAt && diaEnPeriodo(new Date(m.createdAt), period)) {
					if (m.tipo === 'cortesía') {
						cortesiasPeriodo += m.salida || 0;
					}
					if (m.tipo === 'préstamo_salida') {
						prestamosSalidaPeriodo += m.salida || 0;
					}
					if (m.tipo === 'préstamo_entrada') {
						prestamosEntradaPeriodo += m.entrada || 0;
					}
				}
			});
		}
	});

	return {
		totalStockValue,
		totalStockUnits,
		lowStockItems,
		cortesiasPeriodo,
		prestamosSalidaPeriodo,
		prestamosEntradaPeriodo,
	};
};
