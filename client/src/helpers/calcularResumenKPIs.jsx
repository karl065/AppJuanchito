import { formatearDia } from './formatearDia';

export const calcularResumenKPIs = (
	safeFacturas,
	safeCajas,
	safeProductos,
	safeMovimientos
) => {
	// 1. Total Ventas (NETO)
	const totalVentasNetas = safeFacturas.reduce(
		(sum, f) => sum + (f.precioVenta || 0),
		0
	);

	// 2. Cajas Cerradas
	const cajasCerradas = safeCajas.filter((c) => c.estado === 'cerrada').length;

	// 3. Desglose de Pagos (para DistribucionPagoCard)
	const pagosFinales = safeFacturas.reduce(
		(acc, f) => {
			acc.efectivo += f.detallePago?.efectivoCliente || 0;
			acc.nequi += f.detallePago?.nequi || 0;
			acc.daviplata += f.detallePago?.daviplata || 0;
			return acc;
		},
		{ efectivo: 0, nequi: 0, daviplata: 0 }
	);

	// 4. Movimientos totales de stock (ACTUALIZADO: usa 'salida' para el conteo de unidades vendidas)
	const stockMovs = safeMovimientos
		.filter((m) => m.tipo === 'venta')
		.reduce((sum, m) => sum + (m.salida || 0), 0);

	// 5. CÁLCULO REAL: Top Productos y Simulación de Ventas Diarias

	// 5a. Cálculo de Top Productos (AHORA ES REAL, agrupando por nombre de producto y sumando 'salida')
	const productosVendidosMap = safeMovimientos
		.filter((m) => m.tipo === 'venta' && m.producto?.nombre && m.salida > 0)
		.reduce((acc, m) => {
			const nombre = m.producto.nombre;
			acc[nombre] = (acc[nombre] || 0) + m.salida;
			return acc;
		}, {});

	const topProductos = Object.entries(productosVendidosMap)
		.map(([name, units]) => ({ name, units }))
		.sort((a, b) => b.units - a.units)
		.slice(0, 5); // Tomar solo los 5 principales

	// 5b. CÁLCULO REAL DE VENTAS DIARIAS (Agrupando facturas por fecha)
	const ventasPorDiaMap = safeFacturas.reduce((acc, f) => {
		// Obtenemos solo la parte de la fecha (YYYY-MM-DD)
		const dateKey = f.createdAt ? f.createdAt.substring(0, 10) : 'Sin Fecha';

		if (dateKey !== 'Sin Fecha') {
			acc[dateKey] = (acc[dateKey] || 0) + (f.precioVenta || 0);
		}
		return acc;
	}, {});

	// Convertir el mapa a un array de objetos { day: 'YYYY-MM-DD', value: totalVenta }
	let ventasPorDiaCalculado = Object.entries(ventasPorDiaMap)
		.map(([date, value]) => ({
			day: formatearDia(date), // Mostrar la etiqueta corta del día
			date: date, // Mantener la fecha completa para ordenar
			value: value,
		}))
		// Ordenar por fecha (más antigua primero)
		.sort((a, b) => new Date(a.date) - new Date(b.date));

	// Si hay más de 7 días, tomar solo los últimos 7
	if (ventasPorDiaCalculado.length > 7) {
		ventasPorDiaCalculado = ventasPorDiaCalculado.slice(-7);
	}

	// Si no hay datos, usar mock de "últimos 7 días sin ventas"
	if (ventasPorDiaCalculado.length === 0) {
		const today = new Date();
		ventasPorDiaCalculado = Array(7)
			.fill(0)
			.map((_, i) => {
				const date = new Date(today);
				date.setDate(today.getDate() - (6 - i)); // Asegurarse de tener 7 días
				return {
					day: date.toLocaleDateString('es-CO', { weekday: 'short' }),
					value: 0,
				};
			});
	}

	return {
		resumenKPIs: {
			totalVentas: totalVentasNetas,
			cajasCerradas: cajasCerradas,
			stockMovs: stockMovs,
			pagos: pagosFinales,
		},
		resumenCharts: {
			ventasPorDia: ventasPorDiaCalculado,
			topProductos: topProductos,
		},
	};
};
