import { formatearDia } from './formatearDia.jsx';

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

	// 3. Desglose de Pagos (CORREGIDO: Restando cambio)
	const pagosFinales = safeFacturas.reduce(
		(acc, f) => {
			// Obtenemos valores seguros
			const efectivoRecibido = f.detallePago?.efectivoCliente || 0;
			const cambioDevuelto = f.detallePago?.cambio || 0;
			const nequi = f.detallePago?.nequi || 0;
			const daviplata = f.detallePago?.daviplata || 0;

			// Lógica de Efectivo Real: Lo que entregó el cliente MENOS lo que se le devolvió
			// Ejemplo: Venta 20k, paga con 50k (efectivoRecibido), cambio 30k.
			// Efectivo Real en caja = 50k - 30k = 20k.
			const efectivoReal = Math.max(0, efectivoRecibido - cambioDevuelto);

			acc.efectivo += efectivoReal;
			acc.nequi += nequi;
			acc.daviplata += daviplata;

			return acc;
		},
		{ efectivo: 0, nequi: 0, daviplata: 0 }
	);

	// 4. Movimientos totales de stock
	const stockMovs = safeMovimientos
		.filter((m) => m.tipo === 'venta')
		.reduce((sum, m) => sum + (m.salida || 0), 0);

	// 5. CÁLCULO REAL: Top Productos y Simulación de Ventas Diarias

	// 5a. Top Productos
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
		.slice(0, 5);

	// 5b. Ventas Diarias
	const ventasPorDiaMap = safeFacturas.reduce((acc, f) => {
		const dateKey = f.createdAt ? f.createdAt.substring(0, 10) : 'Sin Fecha';

		if (dateKey !== 'Sin Fecha') {
			acc[dateKey] = (acc[dateKey] || 0) + (f.precioVenta || 0);
		}
		return acc;
	}, {});

	let ventasPorDiaCalculado = Object.entries(ventasPorDiaMap)
		.map(([date, value]) => ({
			day: formatearDia(date),
			date: date,
			value: value,
		}))
		.sort((a, b) => new Date(a.date) - new Date(b.date));

	if (ventasPorDiaCalculado.length > 7) {
		ventasPorDiaCalculado = ventasPorDiaCalculado.slice(-7);
	}

	if (ventasPorDiaCalculado.length === 0) {
		const today = new Date();
		ventasPorDiaCalculado = Array(7)
			.fill(0)
			.map((_, i) => {
				const date = new Date(today);
				date.setDate(today.getDate() - (6 - i));
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
