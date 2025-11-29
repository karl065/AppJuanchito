import { useState } from 'react';
import Tooltip from '../../../components/Tooltip/Tooltip.jsx';
import { InfoIcon, TrendingUpIcon } from '../../../components/Icons/Icons.jsx';
import KPICard from '../../../components/KPICard/KPICard.jsx';
import HelpModal from '../../../components/HelpModal/HelpModal.jsx';

const ResumenMovimientos = ({ period, resumenMovimientos }) => {
	const [showHelp, setShowHelp] = useState(false);

	// Convertir el objeto de tipos a un array para renderizar
	const movimientosArray = Object.entries(resumenMovimientos.tipos).map(
		([tipo, cantidad]) => ({ tipo, cantidad })
	);

	const helpContent = (
		<div className="space-y-3">
			<p className="font-semibold text-red-300">
				Este informe resume el flujo de inventario (entradas y salidas) por el
				tipo de transacción en el período seleccionado.
			</p>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-green-500">
				<p className="font-bold text-white mb-1">Entradas Totales:</p>
				<p>
					Suma de todas las unidades que ingresaron al stock: (Entrada +
					Préstamo Entrada + Devolución Entrada).
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-red-500">
				<p className="font-bold text-white mb-1">Salidas Totales:</p>
				<p>
					Suma de todas las unidades que salieron del stock: (Salida + Venta +
					Cortesía + Préstamo Salida + Devolución Salida).
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Neto de Movimiento:</p>
				<p>
					El balance de stock del período (Entradas Totales - Salidas Totales).
					Un valor positivo indica que ingresó más stock del que salió.
				</p>
			</div>
		</div>
	);

	return (
		<div className="p-3">
			<div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
				<h3 className="text-xl font-bold text-white">
					Resumen de Movimientos{' '}
					<span className="text-gray-500 text-sm">({period})</span>
				</h3>
				<Tooltip text="Mostrar ayuda para entender el flujo de inventario.">
					<button
						onClick={() => setShowHelp(true)}
						className="p-2  rounded-full hover:bg-red-700 transition-colors text-red-500 hover:text-white">
						<InfoIcon className="w-5 h-5" />
					</button>
				</Tooltip>
			</div>

			<div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
				{/* Métricas principales (KIPs de Movimientos) */}
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
					<KPICard
						title="Entradas Totales"
						value={resumenMovimientos.entradasTotales}
						unit="Unidades"
						icon={<TrendingUpIcon className="text-green-500" />}
					/>
					<KPICard
						title="Salidas Totales"
						value={resumenMovimientos.salidasTotales}
						unit="Unidades"
						icon={
							<TrendingUpIcon className="text-red-500 transform rotate-180" />
						}
					/>
					<KPICard
						title="Movimiento Neto"
						value={resumenMovimientos.neto}
						unit="Unidades"
						icon={
							<TrendingUpIcon
								className={`${
									resumenMovimientos.neto >= 0
										? 'text-green-500'
										: 'text-red-500'
								}`}
							/>
						}
					/>
				</div>

				{/* 1. MODO ESCRITORIO: Encabezados de tabla tradicional */}
				<h4 className="text-md font-bold text-white mb-3 mt-5 border-b border-gray-700/50 pb-1">
					Desglose por Tipo de Transacción
				</h4>
				<div className="hidden sm:flex justify-between text-white border-b border-gray-700 pb-1 font-bold mb-2 text-xs">
					<span className="w-4/12">Tipo de Movimiento</span>
					<span className="w-4/12 text-right">Cantidad de Unidades</span>
					<span className="w-4/12 text-right">Flujo</span>
				</div>

				{/* 2. FILAS DE DATOS (Móvil y Escritorio) */}
				{movimientosArray.some((m) => m.cantidad > 0) ? (
					movimientosArray
						.filter((m) => m.cantidad > 0)
						.map((item) => {
							// Determinar color de flujo
							const isEntrada = item.tipo.includes('entrada');
							const colorClass = isEntrada
								? 'text-green-400'
								: item.tipo === 'venta'
								? 'text-red-400'
								: 'text-yellow-400';
							const flujoLabel = isEntrada ? 'ENTRADA' : 'SALIDA';

							return (
								// Card para móvil, fila para escritorio
								<div
									key={item.tipo}
									className="p-3 mb-3 sm:mb-0 border border-gray-700/50 rounded-lg bg-gray-800 sm:bg-transparent sm:border-0 sm:flex sm:justify-between sm:items-center sm:py-2 text-xs text-white">
									{/* Tipo de Movimiento */}
									<span className="block text-sm sm:text-xs font-bold text-red-300 sm:w-4/12 sm:truncate mb-2 sm:mb-0 capitalize">
										{item.tipo.replace('_', ' ')}
									</span>

									{/* Contenido de la Tabla (Versión Desktop/Mobile) */}
									<div className="grid grid-cols-2 gap-y-1 gap-x-2 sm:flex sm:w-8/12 sm:justify-between sm:items-center">
										{/* Cantidad de Unidades */}
										<div className="flex justify-between sm:block sm:w-6/12 sm:text-right text-gray-400">
											<span className="sm:hidden font-semibold">Unidades:</span>
											<span className={`font-mono ${colorClass}`}>
												{item.cantidad} unds
											</span>
										</div>

										{/* Flujo */}
										<div className="flex justify-between sm:block sm:w-6/12 sm:text-right text-gray-400">
											<span className="sm:hidden font-semibold">Flujo:</span>
											<span
												className={`font-extrabold ${colorClass} uppercase`}>
												{flujoLabel}
											</span>
										</div>
									</div>
								</div>
							);
						})
				) : (
					// Mensaje de Sin Datos
					<div className="text-center py-6 bg-gray-700/50 rounded-lg text-gray-400">
						<TrendingUpIcon className="w-8 h-8 mx-auto mb-2 text-red-500" />
						<p className="font-semibold">
							No se encontraron movimientos de stock en el período seleccionado.
						</p>
						<p className="text-sm">
							Asegúrate de que se hayan registrado entradas, salidas o ventas en
							este período.
						</p>
					</div>
				)}
			</div>

			{/* Modal de Ayuda (Se muestra u oculta con el estado) */}
			{showHelp && (
				<HelpModal
					title="Ayuda: Resumen de Movimientos"
					onClose={() => setShowHelp(false)}>
					{helpContent}
				</HelpModal>
			)}
		</div>
	);
};
export default ResumenMovimientos;
