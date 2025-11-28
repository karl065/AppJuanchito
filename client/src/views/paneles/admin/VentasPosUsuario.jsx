import { InfoIcon } from '../../../components/Icons/Icons';
import Tooltip from '../../../components/Tooltip/Tooltip';
import { formatearPesos } from '../../../helpers/formatearPesos';

const VentasPorUsuario = ({ period, historialVentas }) => (
	<div className="p-3">
		<h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
			Ventas por Usuario{' '}
			<span className="text-gray-500 text-sm">({period})</span>
		</h3>
		<div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
			<p className="text-gray-400 text-sm mb-4">
				Historial de ventas totales y volumen de transacciones por usuario.
				Incluye Base Inicial y Desglose de Pagos.
			</p>
			<div className="mt-3 text-xs overflow-x-auto min-w-[700px] sm:min-w-full">
				{/* Cabecera de la Tabla */}
				<div className="flex justify-between text-white border-b border-gray-700 pb-1 font-bold mb-2">
					<span className="w-2/12">Usuario</span>
					<span className="w-1/12 text-right">Base Inicial</span>
					<span className="w-1/12 text-right">Vtas. Efectivo</span>
					<span className="w-1/12 text-right">Vtas. Nequi</span>
					<span className="w-1/12 text-right">Vtas. Davi</span>
					<span className="w-2/12 text-right flex items-center justify-end gap-1">
						Total Neto
						<Tooltip text="Suma total de todas las ventas registradas por este usuario.">
							<InfoIcon className="w-3 h-3 text-gray-500" />
						</Tooltip>
					</span>
					<span className="w-2/12 text-right flex items-center justify-end gap-1">
						Efectivo Cuadre
						<Tooltip text="Dinero total que DEBE haber en la caja del usuario para el cierre: (Base Inicial + Ventas Efectivo).">
							<InfoIcon className="w-3 h-3 text-gray-500" />
						</Tooltip>
					</span>
				</div>

				{/* Filas de Datos */}
				{historialVentas.map((item) => {
					const totalVentasPagos =
						(item.ventasEfectivo || 0) +
						(item.ventasNequi || 0) +
						(item.ventasDaviplata || 0);
					const totalCierreEfectivo =
						(item.baseEfectivo || 0) + (item.ventasEfectivo || 0);

					return (
						<div
							key={item.user}
							className="flex justify-between items-center py-2 border-b border-gray-700/50 text-white">
							<span className="w-2/12 font-semibold text-red-300 truncate">
								{item.user}
							</span>
							<span className="w-1/12 text-right text-yellow-300 font-mono">
								{formatearPesos(item.baseEfectivo || 0)}
							</span>
							<span className="w-1/12 text-right text-red-400 font-mono">
								{formatearPesos(item.ventasEfectivo || 0)}
							</span>
							<span className="w-1/12 text-right text-green-400 font-mono">
								{formatearPesos(item.ventasNequi || 0)}
							</span>
							<span className="w-1/12 text-right text-blue-400 font-mono">
								{formatearPesos(item.ventasDaviplata || 0)}
							</span>

							<Tooltip
								text={`Total Ventas: ${formatearPesos(totalVentasPagos)}`}>
								<span className="w-2/12 text-right text-yellow-400 font-extrabold">
									{formatearPesos(totalVentasPagos)}
								</span>
							</Tooltip>

							<Tooltip
								text={`Base (${formatearPesos(
									item.baseEfectivo || 0
								)}) + Venta Efectivo (${formatearPesos(
									item.ventasEfectivo || 0
								)}) = ${formatearPesos(totalCierreEfectivo)}`}>
								<span className="w-2/12 text-right text-green-400 font-extrabold">
									{formatearPesos(totalCierreEfectivo)}
								</span>
							</Tooltip>
						</div>
					);
				})}
			</div>
		</div>
	</div>
);
export default VentasPorUsuario;
