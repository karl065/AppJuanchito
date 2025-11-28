import { calcularAnalisisDeStock } from './calcularAnalisisDeStock.jsx';
import { calcularHistorialCajas } from './calcularHistorialCajas.jsx';
import { calcularResumenKPIs } from './calcularResumenKPIs.jsx';
import { calcularVentasDiaLaborado } from './calcularVentasDiaLaborado.jsx';
import { calcularVentasPorUsuario } from './calcularVentasPorUsuario.jsx';
// import { diaEnPeriodo } from "./diaEnPeriodo.jsx";

export const procesarReporteDatos = (
	facturas,
	cajas,
	productos,
	movimientos,
	usuarios
	// period
) => {
	// Asegura que todas las fuentes de datos sean arrays
	const safeFacturas = facturas || [];
	const safeCajas = cajas || [];
	const safeProductos = productos || [];
	const safeMovimientos = movimientos || [];
	const safeUsuarios = usuarios || [];

	// // 1. Filtrar Facturas: Basado en 'createdAt'
	// const filteredFacturas = safeFacturas.filter((f) => {
	// 	if (!f.createdAt) return false;
	// 	return diaEnPeriodo(new Date(f.createdAt), period);
	// });

	// // 2. Filtrar Cajas: Basado en 'fechaCierre' o 'fechaApertura'
	// const filteredCajas = safeCajas.filter((c) => {
	// 	// Usamos fechaCierre para cerradas y fechaApertura para abiertas
	// 	const dateString = c.estado === 'cerrada' ? c.fechaCierre : c.fechaApertura;
	// 	if (!dateString) return false;

	// 	// Convertir la fecha corta (YYYY-MM-DD) a Date para que funcione diaEnPeriodo
	// 	return diaEnPeriodo(new Date(dateString), period);
	// });

	// 1. Resumen General
	const { resumenKPIs, resumenCharts } = calcularResumenKPIs(
		safeFacturas,
		safeCajas,
		safeProductos,
		safeMovimientos
	);

	// 2. Ventas por Usuario
	const ventasPorUsuario = calcularVentasPorUsuario(
		safeFacturas,
		safeCajas,
		safeUsuarios
	);

	// 3. Historial de Cajas
	const historialCajas = calcularHistorialCajas(safeCajas);

	// 4. Ventas Consolidadas por Día Laborado
	const ventasDiaLaborado = calcularVentasDiaLaborado(safeCajas);

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
