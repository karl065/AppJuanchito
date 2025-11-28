import { InfoIcon } from '../../../components/Icons/Icons';
import Tooltip from '../../../components/Tooltip/Tooltip';
import { formatearPesos } from '../../../helpers/formatearPesos';

const VentasPorCaja = ({ period, historialCajas }) => (
	<div className="p-3">
		<h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
			Ventas por Caja <span className="text-gray-500 text-sm">({period})</span>
		</h3>
		<div className="bg-gray-800 p-4 rounded-xl border border-gray-700 overflow-x-auto">
			<p className="text-gray-400 text-sm mb-4">
				Detalle histórico y desglose de pagos por caja.
			</p>
			<div className="mt-3 text-xs min-w-[750px] sm:min-w-full">
				{/* Cabecera de la Tabla */}
				<div className="flex justify-between text-white border-b border-gray-700 pb-1 font-bold mb-2">
					<span className="w-2/12">ID/Fecha</span>
					<span className="w-2/12">Usuario</span>
					<span className="w-1/12 text-right">Base Inicial</span>
					<span className="w-1/12 text-right">Vtas. Efectivo</span>
					<span className="w-1/12 text-right">Vtas. Nequi</span>
					<span className="w-1/12 text-right">Vtas. Davi</span>
					<span className="w-2/12 text-right flex items-center justify-end gap-1">
						Total Neto
						<Tooltip text="Suma total de todas las ventas registradas en esta caja (Efectivo + Nequi + Daviplata).">
							<InfoIcon className="w-3 h-3 text-gray-500" />
						</Tooltip>
					</span>
					<span className="w-2/12 text-right flex items-center justify-end gap-1">
						Efectivo Cuadre
						<Tooltip text="Dinero total que DEBE haber en la caja para el cierre: Base Inicial + Ventas Efectivo.">
							<InfoIcon className="w-3 h-3 text-gray-500" />
						</Tooltip>
					</span>
				</div>

				{/* Filas de Datos */}
				{historialCajas.map((item) => {
					// Cálculo de Cierre para la Ayuda Visual
					const totalVentasPagos =
						item.ventasEfectivo + item.ventasNequi + item.ventasDaviplata; // Mixto eliminado
					const totalCierreEfectivo = item.baseInicial + item.ventasEfectivo;

					return (
						<div
							key={item._id}
							className={`flex justify-between items-center py-2 border-b border-gray-700/50 ${
								item.estado === 'Abierta'
									? 'text-gray-500 italic bg-gray-900/20'
									: 'text-white'
							}`}>
							{/* ID / Fecha */}
							<div className="w-2/12 flex flex-col">
								<span className="font-semibold text-red-300">
									{item.id ? item.id.substring(0, 10) : 'N/A'}...
								</span>
								<span className="text-[10px] text-gray-500">
									{item.fecha} - {item.estado}
								</span>
							</div>

							{/* Usuario */}
							<span className="w-2/12 text-gray-400 font-semibold truncate">
								{item.usuario}
							</span>

							{/* Base Inicial */}
							<span className="w-1/12 text-right text-yellow-300 font-mono">
								{formatearPesos(item.baseInicial)}
							</span>

							{/* Desglose de Pagos (Efectivo, Nequi, Davi) */}
							<span className="w-1/12 text-right text-red-400 font-mono">
								{formatearPesos(item.ventasEfectivo)}
							</span>
							<span className="w-1/12 text-right text-green-400 font-mono">
								{formatearPesos(item.ventasNequi)}
							</span>
							<span className="w-1/12 text-right text-blue-400 font-mono">
								{formatearPesos(item.ventasDaviplata)}
							</span>

							{/* Total Neto */}
							<Tooltip
								text={`Efectivo: ${formatearPesos(
									item.ventasEfectivo
								)}, Nequi: ${formatearPesos(
									item.ventasNequi
								)}, Daviplata: ${formatearPesos(item.ventasDaviplata)}`}>
								<span className="w-2/12 text-right text-yellow-400 font-extrabold">
									{formatearPesos(totalVentasPagos)}
								</span>
							</Tooltip>

							{/* Efectivo Cuadre (Base + Ventas Efectivo) */}
							<Tooltip
								text={`Base (${formatearPesos(
									item.baseInicial
								)}) + Venta Efectivo (${formatearPesos(
									item.ventasEfectivo
								)}) = ${formatearPesos(totalCierreEfectivo)}`}>
								<span className="w-2/12 text-right text-green-400 font-extrabold">
									{formatearPesos(totalCierreEfectivo)}
								</span>
							</Tooltip>
						</div>
					);
				})}
			</div>

			{/* Leyenda de Ayuda */}
			<div className="mt-4 p-3 bg-gray-900 rounded-lg text-gray-500 text-[10px] border border-gray-700">
				<p className="font-bold text-white mb-1">Información de Cuadre:</p>
				<p>
					— **Total Neto** es el valor total de las ventas (suma de todos los
					medios de pago: Efectivo + Nequi + Daviplata).
				</p>
				<p>
					— **Efectivo Cuadre** es la cantidad de efectivo que debe coincidir
					con el conteo físico: **Base Inicial + Ventas en Efectivo**.
				</p>
			</div>
		</div>
	</div>
);
export default VentasPorCaja;
