import { formatearFechaHora } from './formatearFechaHora';

export const calcularVentasDiaLaborado = (safeCajas) => {
	const ventasDiaLaboradoMap = safeCajas
		.filter((c) => c.estado === 'cerrada')
		.reduce((acc, c) => {
			const dateKey = formatearFechaHora(c.cierre.horaCierre) || 'Sin Fecha';

			if (!acc[dateKey]) {
				acc[dateKey] = {
					dia: dateKey,
					baseTotal: 0,
					ventasEfectivo: 0,
					ventasNequi: 0,
					ventasDaviplata: 0,
				};
			}

			acc[dateKey].baseTotal += c.apertura?.baseInicial || 0;
			acc[dateKey].ventasEfectivo += c.totalEfectivo || 0;
			acc[dateKey].ventasNequi += c.totalNequi || 0;
			acc[dateKey].ventasDaviplata += c.totalDaviplata || 0;

			return acc;
		}, {});

	return Object.values(ventasDiaLaboradoMap).map((item) => ({
		...item,
		// Agregando lógica de cuadre para que sea más fácil de renderizar
		totalNeto: item.ventasEfectivo + item.ventasNequi + item.ventasDaviplata,
		totalCuadre: item.baseTotal + item.ventasEfectivo,
	}));
};
