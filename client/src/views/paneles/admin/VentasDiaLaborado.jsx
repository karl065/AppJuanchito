import { useState } from 'react';
import HelpModal from '../../../components/HelpModal/HelpModal.jsx';
import { CalendarIcon, InfoIcon } from '../../../components/Icons/Icons.jsx';
import Tooltip from '../../../components/Tooltip/Tooltip.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';

const VentasDiaLaborado = ({ period, ventasPorDiaLaborado }) => {
	const [showHelp, setShowHelp] = useState(false);

	const helpContent = (
		<div className="space-y-3">
			<p className="font-semibold text-red-300">
				Este informe consolida las ventas totales y los totales de base de todas
				las cajas cerradas en un mismo día, proporcionando una vista de la
				operación diaria del negocio.
			</p>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Día Laborado:</p>
				<p>
					Fecha de cierre del día, utilizada para agrupar todas las cajas de ese
					período.
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Base Total:</p>
				<p>
					La suma de las Bases Iniciales de todas las cajas que cerraron ese
					día.
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Vtas. Efectivo:</p>
				<p>
					Monto total de las ventas netas realizadas en efectivo consolidadas de
					todas las cajas del día.
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-yellow-500">
				<p className="font-bold text-white mb-1">Total Neto:</p>
				<p>
					La suma total de todas las ventas consolidadas del día (Efectivo Neto
					+ Nequi + Daviplata).
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-green-500">
				<p className="font-bold text-white mb-1">Cuadre Efectivo:</p>
				<p>
					El efectivo total consolidado que **debería haber en la bóveda o caja
					principal** al final del día: (Base Total + Ventas Efectivo
					Consolidadas).
				</p>
			</div>
		</div>
	);

	return (
		<div className="p-3">
			<div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
				<h3 className="text-xl font-bold text-white">
					Ventas Consolidadas por Día{' '}
					<span className="text-gray-500 text-sm">({period})</span>
				</h3>
				<Tooltip text="Mostrar ayuda para entender las métricas de la consolidación diaria.">
					<button
						onClick={() => setShowHelp(true)}
						className="p-2 rounded-full hover:bg-red-700 transition-colors text-red-500 hover:text-white">
						<InfoIcon className="w-5 h-5" />
					</button>
				</Tooltip>
			</div>
			<div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
				<p className="text-gray-400 text-sm mb-4">
					Suma de todas las ventas de todas las cajas en un día de operación
					(Viernes, Sábado o Domingo).
				</p>

				{/* 1. MODO ESCRITORIO: Encabezados de tabla tradicional */}
				<div className="hidden sm:flex justify-between text-white border-b border-gray-700 pb-1 font-bold mb-2 text-xs">
					<span className="w-2/12">Día Laborado</span>
					<span className="w-1/12 text-right">Base Total</span>
					<span className="w-1/12 text-right">Vtas. Efectivo</span>
					<span className="w-1/12 text-right">Vtas. Nequi</span>
					<span className="w-1/12 text-right">Vtas. Davi</span>
					<span className="w-3/12 text-right flex items-center justify-end gap-1">
						Total Neto
						<Tooltip text="Venta total consolidada del día (Efectivo + Nequi + Daviplata).">
							<InfoIcon className="w-3 h-3 text-gray-500" />
						</Tooltip>
					</span>
					<span className="w-3/12 text-right flex items-center justify-end gap-1">
						Cuadre Efectivo
						<Tooltip text="Efectivo total que DEBE tener la bóveda: (Base Total + Venta Efectivo Consolidada).">
							<CalendarIcon className="w-3 h-3 text-gray-500" />
						</Tooltip>
					</span>
				</div>

				{/* 2. FILAS DE DATOS (Móvil y Escritorio) */}
				{ventasPorDiaLaborado.length > 0 ? (
					ventasPorDiaLaborado.map((item) => {
						const totalNeto = item.totalNeto;
						const totalCuadre = item.totalCuadre;

						return (
							// Card para móvil, fila para escritorio
							<div
								key={item.dia}
								className="p-3 mb-3 sm:mb-0 border border-gray-700/50 rounded-lg bg-gray-800 sm:bg-transparent sm:border-0 sm:flex sm:justify-between sm:items-center sm:py-2 text-xs text-white">
								{/* Día Laborado */}
								<span className="block text-sm sm:text-xs font-bold text-red-300 sm:w-2/12 sm:truncate mb-2 sm:mb-0">
									{item.dia}
								</span>

								{/* Contenido de la Tabla (Versión Desktop/Mobile) */}
								<div className="grid grid-cols-2 gap-y-1 gap-x-2 sm:flex sm:w-10/12 sm:justify-between sm:items-center">
									{/* Base Total */}
									<div className="flex justify-between sm:block sm:w-1/12 sm:text-right text-gray-400">
										<span className="sm:hidden font-semibold">Base Total:</span>
										<span className="text-yellow-300 font-mono">
											{formatearPesos(item.baseTotal)}
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
									<div className="flex justify-between col-span-2 border-t border-gray-700 pt-2 mt-2 sm:mt-0 sm:pt-0 sm:border-t-0 sm:block sm:w-3/12 sm:text-right font-bold text-white">
										<span className="sm:hidden font-semibold">Total Neto:</span>
										<Tooltip
											text={`Total Ventas: ${formatearPesos(totalNeto)}`}>
											<span className="text-yellow-400 font-extrabold">
												{formatearPesos(totalNeto)}
											</span>
										</Tooltip>
									</div>

									{/* Efectivo Cuadre */}
									<div className="flex justify-between col-span-2 sm:block sm:w-3/12 sm:text-right font-bold text-white">
										<span className="sm:hidden font-semibold">
											Cuadre Efec.:
										</span>
										<Tooltip
											text={`Base Total (${formatearPesos(
												item.baseTotal
											)}) + Vtas. Efectivo (${formatearPesos(
												item.ventasEfectivo
											)}) = ${formatearPesos(totalCuadre)}`}>
											<span className="text-green-400 font-extrabold">
												{formatearPesos(totalCuadre)}
											</span>
										</Tooltip>
									</div>
								</div>
							</div>
						);
					})
				) : (
					// Mensaje de Sin Datos
					<div className="text-center py-6 bg-gray-700/50 rounded-lg text-gray-400">
						<CalendarIcon className="w-8 h-8 mx-auto mb-2 text-red-500" />
						<p className="font-semibold">
							No se encontraron ventas consolidadas para el período
							seleccionado.
						</p>
						<p className="text-sm">
							Asegúrate de que existan cajas cerradas en este período de tiempo.
						</p>
					</div>
				)}
			</div>

			{/* Modal de Ayuda (Se muestra u oculta con el estado) */}
			{showHelp && (
				<HelpModal
					title="Ayuda: Ventas Consolidadas por Día"
					onClose={() => setShowHelp(false)}>
					{helpContent}
				</HelpModal>
			)}
		</div>
	);
};
export default VentasDiaLaborado;
