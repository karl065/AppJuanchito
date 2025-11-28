import { CalendarIcon, InfoIcon } from '../../../components/Icons/Icons.jsx';
import Tooltip from '../../../components/Tooltip/Tooltip.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';

const VentasDiaLaborado = ({ period, ventasPorDiaLaborado }) => (
	<div className="p-3">
		<h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
			Ventas Consolidadas por Día{' '}
			<span className="text-gray-500 text-sm">({period})</span>
		</h3>
		<div className="bg-gray-800 p-4 rounded-xl border border-gray-700 overflow-x-auto">
			<p className="text-gray-400 text-sm mb-4">
				Suma de todas las ventas de todas las cajas en un día de operación
				(Viernes, Sábado o Domingo).
			</p>
			<div className="mt-3 text-xs min-w-[750px] sm:min-w-full">
				{/* Cabecera de la Tabla */}
				<div className="flex justify-between text-white border-b border-gray-700 pb-1 font-bold mb-2">
					<span className="w-2/12">Día Laborado</span>
					<span className="w-1/12 text-right">Base Total</span>
					<span className="w-1/12 text-right">Vtas. Efectivo</span>
					<span className="w-1/12 text-right">Vtas. Nequi</span>
					<span className="w-1/12 text-right">Vtas. Davi</span>
					<span className="w-2/12 text-right flex items-center justify-end gap-1">
						Total Neto
						<Tooltip text="Venta total consolidada del día (Efectivo + Nequi + Daviplata).">
							<InfoIcon className="w-3 h-3 text-gray-500" />
						</Tooltip>
					</span>
					<span className="w-2/12 text-right flex items-center justify-end gap-1">
						Cuadre Efectivo
						<Tooltip text="Efectivo total que DEBE tener la bóveda: (Base Total + Venta Efectivo Consolidada).">
							<CalendarIcon className="w-3 h-3 text-gray-500" />
						</Tooltip>
					</span>
				</div>

				{/* Filas de Datos */}
				{ventasPorDiaLaborado.map((item) => {
					// Las propiedades totalNeto y totalCuadre ya vienen calculadas del helper
					const totalNeto = item.totalNeto;
					const totalCuadre = item.totalCuadre;

					return (
						<div
							key={item.dia}
							className="flex justify-between items-center py-2 border-b border-gray-700/50 text-white">
							<span className="w-2/12 font-semibold text-red-300">
								{item.dia}
							</span>
							<span className="w-1/12 text-right text-yellow-300 font-mono">
								{formatearPesos(item.baseTotal)}
							</span>
							<span className="w-1/12 text-right text-red-400 font-mono">
								{formatearPesos(item.ventasEfectivo)}
							</span>
							<span className="w-1/12 text-right text-green-400 font-mono">
								{formatearPesos(item.ventasNequi)}
							</span>
							<span className="w-1/12 text-right text-blue-400 font-mono">
								{formatearPesos(item.ventasDaviplata)}
							</span>

							<Tooltip text={`Total Ventas: ${formatearPesos(totalNeto)}`}>
								<span className="w-2/12 text-right text-yellow-400 font-extrabold">
									{formatearPesos(totalNeto)}
								</span>
							</Tooltip>

							<Tooltip
								text={`Base Total (${formatearPesos(
									item.baseTotal
								)}) + Vtas. Efectivo (${formatearPesos(
									item.ventasEfectivo
								)}) = ${formatearPesos(totalCuadre)}`}>
								<span className="w-2/12 text-right text-green-400 font-extrabold">
									{formatearPesos(totalCuadre)}
								</span>
							</Tooltip>
						</div>
					);
				})}
			</div>
		</div>
	</div>
);
export default VentasDiaLaborado;
