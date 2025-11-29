import { useState } from 'react';
import HelpModal from '../../../components/HelpModal/HelpModal.jsx';
import { CashIcon, InfoIcon } from '../../../components/Icons/Icons.jsx';
import Tooltip from '../../../components/Tooltip/Tooltip.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';

const VentasPorCaja = ({ period, historialCajas }) => {
	const [showHelp, setShowHelp] = useState(false);

	const helpContent = (
		<div className="space-y-3">
			<p className="font-semibold text-red-300">
				Este informe muestra el historial detallado de las aperturas y cierres
				de caja en el período, incluyendo el estado (abierta/cerrada) y el
				desglose de los totales de venta por método de pago.
			</p>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Fecha/Hora:</p>
				<p>
					Muestra la hora de cierre (si está cerrada) o la hora de apertura (si
					está abierta).
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Base Inicial:</p>
				<p>
					El monto de efectivo registrado al momento de la apertura de la caja.
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Vtas. Efectivo:</p>
				<p>
					Monto total de las ventas netas realizadas en efectivo durante la
					operación de esta caja (después de restar el cambio).
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-yellow-500">
				<p className="font-bold text-white mb-1">Total Neto:</p>
				<p>
					La suma de todas las ventas totales registradas en esta caja (Efectivo
					+ Nequi + Daviplata).
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-green-500">
				<p className="font-bold text-white mb-1">Efectivo Cuadre:</p>
				<p>
					El total de efectivo que **debería estar en la caja** al momento del
					cierre: (Base Inicial + Ventas Efectivo Netas).
				</p>
			</div>
		</div>
	);

	return (
		<div className="p-3">
			<div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
				<h3 className="text-xl font-bold text-white">
					Ventas por Caja{' '}
					<span className="text-gray-500 text-sm">({period})</span>
				</h3>
				<Tooltip text="Mostrar ayuda para entender las columnas.">
					<button
						onClick={() => setShowHelp(true)}
						className="p-2 rounded-full hover:bg-red-700 transition-colors text-red-500 hover:text-white">
						<InfoIcon className="w-5 h-5" />
					</button>
				</Tooltip>
			</div>

			<div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
				<p className="text-gray-400 text-sm mb-4">
					Detalle histórico y desglose de pagos por caja.
				</p>

				{/* 1. MODO ESCRITORIO: Encabezados de tabla tradicional */}
				<div className="hidden sm:flex justify-between text-white border-b border-gray-700 pb-1 font-bold mb-2 text-xs">
					<span className="w-2/12">Fecha/Hora</span>
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

				{/* 2. FILAS DE DATOS (Móvil y Escritorio) */}
				{historialCajas.length > 0 ? (
					historialCajas.map((item) => {
						const totalVentasPagos =
							(item.ventasEfectivo || 0) +
							(item.ventasNequi || 0) +
							(item.ventasDaviplata || 0);
						const totalCierreEfectivo =
							(item.baseInicial || 0) + (item.ventasEfectivo || 0);
						const isClosed = item.estado === 'cerrada';

						return (
							// Card para móvil, fila para escritorio
							<div
								key={item.id}
								className={`p-3 mb-3 sm:mb-0 border border-gray-700/50 rounded-lg sm:border-0 sm:flex sm:justify-between sm:items-center sm:py-2 text-xs ${
									isClosed
										? 'bg-gray-800 text-white'
										: 'bg-gray-900/20 text-gray-400 italic'
								}`}>
								{/* Fecha/Hora / Estado */}
								<div className="flex justify-between sm:flex-col sm:justify-start sm:w-2/12 sm:pr-2 mb-2 sm:mb-0">
									<span className="font-semibold text-red-300 sm:text-xs">
										{item.fecha || 'N/A'}
									</span>
									<span className="text-[10px] text-gray-500">
										{item.estado}
									</span>
								</div>

								{/* Contenido de la Tabla (Versión Desktop/Mobile) */}
								<div className="grid grid-cols-2 gap-y-1 gap-x-2 sm:flex sm:w-10/12 sm:justify-between sm:items-center">
									{/* Usuario */}
									<div className="flex justify-between col-span-2 sm:block sm:w-2/12 sm:text-left text-gray-400">
										<span className="sm:hidden font-semibold">Usuario:</span>
										<span className="font-semibold truncate">
											{item.usuario}
										</span>
									</div>

									{/* Base Inicial */}
									<div className="flex justify-between sm:block sm:w-1/12 sm:text-right text-gray-400">
										<span className="sm:hidden font-semibold">Base:</span>
										<span className="text-yellow-300 font-mono">
											{formatearPesos(item.baseInicial)}
										</span>
									</div>

									{/* Vtas. Efectivo */}
									<div className="flex justify-between sm:block sm:w-1/12 sm:text-right text-gray-400">
										<span className="sm:hidden font-semibold">
											Vtas. Efec.:
										</span>
										<span className="text-red-400 font-mono">
											{formatearPesos(item.ventasEfectivo)}
										</span>
									</div>

									{/* Vtas. Nequi */}
									<div className="flex justify-between sm:block sm:w-1/12 sm:text-right text-gray-400">
										<span className="sm:hidden font-semibold">Nequi:</span>
										<span className="text-green-400 font-mono">
											{formatearPesos(item.ventasNequi)}
										</span>
									</div>

									{/* Vtas. Daviplata */}
									<div className="flex justify-between sm:block sm:w-1/12 sm:text-right text-gray-400">
										<span className="sm:hidden font-semibold">Daviplata:</span>
										<span className="text-blue-400 font-mono">
											{formatearPesos(item.ventasDaviplata)}
										</span>
									</div>

									{/* Total Neto */}
									<div className="flex justify-between col-span-2 border-t border-gray-700 pt-2 mt-2 sm:mt-0 sm:pt-0 sm:border-t-0 sm:block sm:w-2/12 sm:text-right font-bold">
										<span className="sm:hidden font-semibold">Total Neto:</span>
										<Tooltip
											text={`Total Ventas: ${formatearPesos(
												totalVentasPagos
											)}`}>
											<span className="text-yellow-400 font-extrabold">
												{formatearPesos(totalVentasPagos)}
											</span>
										</Tooltip>
									</div>

									{/* Efectivo Cuadre */}
									<div className="flex justify-between col-span-2 sm:block sm:w-2/12 sm:text-right font-bold">
										<span className="sm:hidden font-semibold">
											Cuadre Efec.:
										</span>
										<Tooltip
											text={`Base (${formatearPesos(
												item.baseInicial
											)}) + Venta Efectivo (${formatearPesos(
												item.ventasEfectivo
											)}) = ${formatearPesos(totalCierreEfectivo)}`}>
											<span className="text-green-400 font-extrabold">
												{formatearPesos(totalCierreEfectivo)}
											</span>
										</Tooltip>
									</div>
								</div>
							</div>
						);
					})
				) : (
					// 🚨 Mensaje de Sin Datos
					<div className="text-center py-6 bg-gray-700/50 rounded-lg text-gray-400">
						<CashIcon className="w-8 h-8 mx-auto mb-2 text-red-500" />
						<p className="font-semibold">
							No se encontraron registros de caja para el usuario o período
							seleccionado.
						</p>
						<p className="text-sm">
							Asegúrate de que el usuario haya cerrado su caja o ajusta el
							período de tiempo.
						</p>
					</div>
				)}

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

			{/* Modal de Ayuda (Se muestra u oculta con el estado) */}
			{showHelp && (
				<HelpModal
					title="Ayuda: Ventas por Caja"
					onClose={() => setShowHelp(false)}>
					{helpContent}
				</HelpModal>
			)}
		</div>
	);
};
export default VentasPorCaja;
