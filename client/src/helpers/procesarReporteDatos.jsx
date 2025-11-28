import { calcularAnalisisDeStock } from './calcularAnalisisDeStock.jsx';
import { calcularHistorialCajas } from './calcularHistorialCajas.jsx';
import { calcularResumenKPIs } from './calcularResumenKPIs.jsx';
import { calcularVentasDiaLaborado } from './calcularVentasDiaLaborado.jsx';
import { calcularVentasPorUsuario } from './calcularVentasPorUsuario.jsx';
import { diaEnPeriodo } from './diaEnPeriodo.jsx';
// import { diaEnPeriodo } from "./diaEnPeriodo.jsx";

export const procesarReporteDatos = (
	facturas,
	cajas,
	productos,
	movimientos,
	usuarios,
	period,
	userId
) => {
	// Asegura que todas las fuentes de datos sean arrays
	let safeFacturas = facturas || [];
	let safeCajas = cajas || [];
	const safeProductos = productos || [];
	const safeMovimientos = movimientos || [];
	const safeUsuarios = usuarios || [];

	// ==============================================================================================
	// 🚨 FILTRO POR USUARIO (Primer Nivel)
	// Se aplica a Facturas y Cajas, a menos que userId sea 'all' o no se haya pasado.
	// ==============================================================================================
	if (userId && userId !== 'all') {
		safeFacturas = safeFacturas.filter((f) => f.usuario?._id === userId);
		safeCajas = safeCajas.filter((c) => c.usuario?._id === userId);
	}

	// 1. Filtrar Facturas: Basado en 'createdAt'
	const filteredFacturas = safeFacturas.filter((f) => {
		if (!f.createdAt) return false;
		return diaEnPeriodo(new Date(f.createdAt), period);
	});

	// 2. Filtrar Cajas: Basado en 'fechaCierre' o 'fechaApertura'
	const filteredCajas = safeCajas.filter((c) => {
		// Usamos fechaCierre para cerradas y fechaApertura para abiertas
		const dateString =
			c.estado === 'cerrada' ? c.cierre.horaCierre : c.apertura.horaApertura;
		if (!dateString) return false;

		// Convertir la fecha corta (YYYY-MM-DD) a Date para que funcione diaEnPeriodo
		return diaEnPeriodo(new Date(dateString), period);
	});

	// 1. Resumen General
	const { resumenKPIs, resumenCharts } = calcularResumenKPIs(
		filteredFacturas,
		filteredCajas,
		safeProductos,
		safeMovimientos
	);

	// 2. Ventas por Usuario
	const ventasPorUsuario = calcularVentasPorUsuario(
		filteredFacturas,
		filteredCajas,
		safeUsuarios
	);

	// 3. Historial de Cajas
	const historialCajas = calcularHistorialCajas(filteredCajas);

	// 4. Ventas Consolidadas por Día Laborado
	const ventasDiaLaborado = calcularVentasDiaLaborado(filteredCajas);

	// 5. Análisis de Stock
	const analisisStock = calcularAnalisisDeStock(safeProductos);

	// --- CONSOLIDACIÓN FINAL ---
	return {
		resumenKPIs,
		resumenCharts,
		ventasPorUsuario,
		historialCajas,
		ventasDiaLaborado,
		analisisStock,
	};
};
