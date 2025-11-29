import { useState } from 'react';
import ChartContainer from '../../../components/ChartContainer/ChartContainer.jsx';
import DistribucionPagoCard from '../../../components/DistribucionPagoCard/DitribucionPAgoCard.jsx';
import { CashIcon, InfoIcon } from '../../../components/Icons/Icons.jsx';
import KPICard from '../../../components/KPICard/KPICard.jsx';
import { formatearMonedaCompactada } from '../../../helpers/formatearMonedaCompactada.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import HelpModal from '../../../components/HelpModal/HelpModal.jsx';

const ResumenGeneral = ({ period, reportData, chartData }) => {
	// Estado para el modal de ayuda
	const [showHelp, setShowHelp] = useState(false);

	// Tomamos el valor máximo de venta para normalizar las barras
	const maxSale = chartData.ventasPorDia.reduce(
		(max, d) => Math.max(max, d.value),
		0
	);
	const safeMaxSale = maxSale > 0 ? maxSale : 1;

	// 🚨 Paleta de colores para las barras
	const barColors = [
		'bg-red-500',
		'bg-orange-500',
		'bg-amber-500',
		'bg-yellow-500',
		'bg-lime-500',
		'bg-green-500',
		'bg-emerald-500',
		'bg-teal-500',
		'bg-cyan-500',
		'bg-sky-500',
		'bg-blue-500',
		'bg-indigo-500',
		'bg-violet-500',
		'bg-purple-500',
		'bg-fuchsia-500',
		'bg-pink-500',
		'bg-rose-500',
	];

	// Contenido de Ayuda para el Resumen General
	const helpContent = (
		<div className="space-y-3">
			<p className="font-semibold text-red-300">
				Este panel es el centro de control principal, mostrando los indicadores
				más importantes del período seleccionado.
			</p>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Ventas Netas:</p>
				<p>
					La suma total de todas las facturas generadas. Es el ingreso bruto
					antes de gastos.
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Cajas Cuadradas:</p>
				<p>
					Número de cajas que han sido cerradas ("cuadradas") por los cajeros en
					este período.
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-red-500">
				<p className="font-bold text-white mb-1">Top 5 Productos:</p>
				<p>
					Los productos con mayor rotación (más unidades vendidas) en el tiempo
					seleccionado.
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-blue-500">
				<p className="font-bold text-white mb-1">Gráfico de Ventas:</p>
				<p>
					Muestra la tendencia diaria de ventas. Los valores muestran el total
					exacto vendido por día.
				</p>
			</div>
		</div>
	);

	return (
		<div className="flex flex-col gap-4 p-3 overflow-y-auto">
			{/* Header de la Vista con Botón de Ayuda */}
			<div className="flex items-center justify-between border-b border-white pb-2">
				<h3 className="text-lg font-bold text-white">
					Resumen General{' '}
					<span className="text-gray-500 text-sm">({period})</span>
				</h3>
				<button
					onClick={() => setShowHelp(true)}
					className="p-2  rounded-full hover:bg-red-700 transition-colors text-red-500 hover:text-white">
					<InfoIcon className="w-5 h-5" />
				</button>
			</div>

			{/* Venta Semanal y Mensual (KPIs solicitados) */}
			<div className="grid grid-cols-2 gap-3">
				{/* KPI Principal: Ventas Totales (Diarias, Semanales o Mensuales) */}
				<KPICard
					title={`Ventas Netas (${period.toUpperCase()})`}
					value={formatearPesos(reportData.totalVentas)}
					icon={<CashIcon />}
					isMain={true}
				/>

				{/* Cajas Cuadradas */}
				<KPICard
					title="Cajas Cuadradas"
					value={reportData.cajasCerradas}
					unit={`en ${period}`}
				/>

				{/* Top 5 Productos (Gráfico/Lista) */}
				<ChartContainer title="Top 5 Productos Vendidos">
					<p className="text-xs text-gray-400 mb-2">
						Unidades vendidas en el período.
					</p>
					<div className="space-y-2">
						{/* Se usa el array 'topProductos' ya calculado */}
						{chartData.topProductos.map((p, index) => (
							<div
								key={p.name}
								className="flex items-center justify-between text-xs">
								<span className="text-gray-300">
									{index + 1}. {p.name}
								</span>
								<span className="font-bold text-red-400">{p.units} unds</span>
							</div>
						))}
					</div>
				</ChartContainer>

				{/* Movimientos de Stock */}
				<KPICard
					title="Movs. Stock Total"
					value={reportData.stockMovs}
					unit="Unidades Totales"
				/>
			</div>

			{/* Ventas Diarias (Gráfico de Barras) */}
			<ChartContainer
				title={`Ventas Diarias (Últimos ${chartData.ventasPorDia.length} días)`}>
				<p className="text-xs text-gray-400 mb-2">
					Visualización de ventas por día.
				</p>
				{/* 🚨 Aumenté la altura a h-40 para dar espacio a los textos superiores */}
				<div className="flex items-end h-40 gap-1.5 w-full bg-gray-900 rounded-lg p-2 border border-gray-700 pt-6">
					{/* Generación Real del Gráfico de Barras con Etiquetas de Valor */}
					{chartData.ventasPorDia.map((item, index) => (
						<div
							key={item.date || index}
							className="flex flex-col items-center justify-end h-full flex-1 group relative">
							{/* 🚨 Etiqueta de Valor: FORMATO NORMAL, SIN ROTACIÓN */}
							<span className="text-[9px] sm:text-[10px] text-white font-bold mb-1 whitespace-nowrap bg-gray-900/80 px-1 rounded z-10">
								{formatearMonedaCompactada(item.value)}
							</span>

							{/* Barra con Color Dinámico */}
							<div
								className={`w-full sm:w-3/4 rounded-t-sm transition-colors shadow-md shadow-gray-900/50 ${
									barColors[index % barColors.length]
								}`}
								style={{
									height: `${(item.value / safeMaxSale) * 100}%`,
								}}></div>
							<span className="text-[8px] text-gray-500 mt-1">{item.day}</span>
						</div>
					))}
				</div>
			</ChartContainer>

			{/* Tarjeta de Distribución de Pago por Valor */}
			<DistribucionPagoCard
				pagos={reportData.pagos}
				totalVentas={reportData.totalVentas}
			/>

			<div className="h-4"></div>

			{/* Modal de Ayuda (Se muestra u oculta con el estado) */}
			{showHelp && (
				<HelpModal
					title="Ayuda: Resumen General"
					onClose={() => setShowHelp(false)}>
					{helpContent}
				</HelpModal>
			)}
		</div>
	);
};
export default ResumenGeneral;
