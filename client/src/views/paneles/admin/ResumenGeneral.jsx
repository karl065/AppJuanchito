import ChartContainer from '../../../components/ChartContainer/ChartContainer.jsx';
import DistribucionPagoCard from '../../../components/DistribucionPagoCard/DitribucionPAgoCard.jsx';
import { CashIcon } from '../../../components/Icons/Icons.jsx';
import KPICard from '../../../components/KPICard/KPICard.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';

const ResumenGeneral = ({ period, reportData, chartData }) => {
	const maxSale = Math.max(...chartData.ventasPorDia.map((d) => d.value));

	return (
		<div className="flex flex-col gap-4 p-3 overflow-y-auto">
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
			<ChartContainer title={`Ventas Diarias (Últimos 7 días)`}>
				<p className="text-xs text-gray-400 mb-2">
					Visualización de ventas por día.
				</p>
				<div className="flex items-end h-32 gap-1.5 w-full bg-gray-900 rounded-lg p-2 border border-gray-700">
					{/* Simulación de Gráfico de Barras */}
					{chartData.ventasPorDia.map((item, index) => (
						<div
							key={index}
							className="flex flex-col items-center justify-end h-full flex-1">
							<div
								className="w-3/4 rounded-t-sm bg-red-600 hover:bg-red-500 transition-colors shadow-md shadow-red-900/50"
								style={{ height: `${(item.value / maxSale) * 100}%` }}
								title={formatearPesos(item.value)}></div>
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
		</div>
	);
};
export default ResumenGeneral;
