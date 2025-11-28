import { useState } from 'react';
import { InfoIcon, UsersIcon } from '../../../components/Icons/Icons.jsx';
import Tooltip from '../../../components/Tooltip/Tooltip.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import HelpModal from '../../../components/HelpModal/HelpModal.jsx';

const VentasPorUsuario = ({ period, historialVentas }) => {
	const [showHelp, setShowHelp] = useState(false);

	const helpContent = (
		<div className="space-y-3">
			<p className="font-semibold text-red-300">
				Este informe consolida la actividad de ventas y manejo de efectivo por
				cada empleado que ha registrado actividad en el período seleccionado.
			</p>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Base Inicial:</p>
				<p>
					Monto de efectivo con el que el usuario inició su turno de caja,
					tomado del registro de apertura de caja.
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Vtas. Efectivo:</p>
				<p>
					El total **Neto** de efectivo que el usuario ingresó a la caja a
					través de ventas. Este valor ya tiene descontado el 'Cambio' que se
					entregó a los clientes.
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Vtas. Nequi/Daviplata:</p>
				<p>
					Monto total de las ventas registradas por el usuario a través de pagos
					digitales (Nequi y Daviplata).
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-yellow-500">
				<p className="font-bold text-white mb-1">Total Neto:</p>
				<p>
					La suma de todas las ventas totales del usuario (Efectivo Neto + Nequi
					+ Daviplata).
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-green-500">
				<p className="font-bold text-white mb-1">Efectivo Cuadre:</p>
				<p>
					El total de efectivo que el usuario **debe tener** para el cierre:
					(Base Inicial + Vtas. Efectivo Netas).
				</p>
			</div>
		</div>
	);

	return (
		<div className="p-3">
			<div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
				<h3 className="text-xl font-bold text-white">
					Ventas por Usuario{' '}
					<span className="text-gray-500 text-sm">({period})</span>
				</h3>
				<Tooltip text="Mostrar ayuda para entender las columnas.">
					<button
						onClick={() => setShowHelp(true)}
						className="p-2 bg-gray-800 rounded-full hover:bg-red-700 transition-colors text-red-500 hover:text-white">
						<InfoIcon className="w-5 h-5" />
					</button>
				</Tooltip>
			</div>

			<div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
				<p className="text-gray-400 text-sm mb-4">
					Detalle de ventas y cuadre por empleado.
				</p>

				{/* 1. MODO ESCRITORIO: Encabezados de tabla tradicional (Se muestra en pantallas grandes) */}
				<div className="hidden sm:flex justify-between text-white border-b border-gray-700 pb-1 font-bold mb-2 text-xs">
					<span className="w-2/12">Usuario</span>
					<span className="w-1/12 text-right">Base Inicial</span>
					<span className="w-1/12 text-right">Vtas. Efectivo</span>
					<span className="w-1/12 text-right">Vtas. Nequi</span>
					<span className="w-1/12 text-right">Vtas. Davi</span>
					<span className="w-3/12 text-right flex items-center justify-end gap-1">
						Total Neto
						<Tooltip text="Suma total de todas las ventas registradas por este usuario.">
							<InfoIcon className="w-3 h-3 text-gray-500" />
						</Tooltip>
					</span>
					<span className="w-3/12 text-right flex items-center justify-end gap-1">
						Efectivo Cuadre
						<Tooltip text="Dinero total que DEBE haber en la caja del usuario: (Base Inicial + Ventas Efectivo).">
							<InfoIcon className="w-3 h-3 text-gray-500" />
						</Tooltip>
					</span>
				</div>

				{/* 2. FILAS DE DATOS (Móvil y Escritorio) */}
				{historialVentas.length > 0 ? (
					historialVentas.map((item) => {
						const totalVentasPagos =
							(item.ventasEfectivo || 0) +
							(item.ventasNequi || 0) +
							(item.ventasDaviplata || 0);
						const totalCierreEfectivo =
							(item.baseEfectivo || 0) + (item.ventasEfectivo || 0);

						return (
							// Card para móvil, fila para escritorio
							<div
								key={item.user}
								className="p-3 mb-3 sm:mb-0 border border-gray-700/50 rounded-lg bg-gray-800 sm:bg-transparent sm:border-0 sm:flex sm:justify-between sm:items-center sm:py-2 sm:text-white">
								{/* 2a. Usuario (Visible en móvil y escritorio) */}
								<span className="block text-sm sm:text-xs font-bold text-red-300 sm:w-2/12 sm:truncate mb-2 sm:mb-0">
									{item.user}
								</span>

								{/* 2b. Contenido de la Tabla (Versión Desktop/Mobile) */}
								<div className="grid grid-cols-2 gap-y-1 gap-x-2 text-xs sm:flex sm:w-10/12 sm:justify-between sm:items-center">
									{/* Base Inicial */}
									<div className="flex justify-between sm:block sm:w-1/12 sm:text-right text-gray-400">
										<span className="sm:hidden font-semibold">Base:</span>
										<span className="text-yellow-300 font-mono">
											{formatearPesos(item.baseEfectivo || 0)}
										</span>
									</div>

									{/* Ventas Efectivo */}
									<div className="flex justify-between sm:block sm:w-1/12 sm:text-right text-gray-400">
										<span className="sm:hidden font-semibold">
											Vtas. Efec.:
										</span>
										<span className="text-red-400 font-mono">
											{formatearPesos(item.ventasEfectivo || 0)}
										</span>
									</div>

									{/* Ventas Nequi */}
									<div className="flex justify-between sm:block sm:w-1/12 sm:text-right text-gray-400">
										<span className="sm:hidden font-semibold">Nequi:</span>
										<span className="text-green-400 font-mono">
											{formatearPesos(item.ventasNequi || 0)}
										</span>
									</div>

									{/* Ventas Daviplata */}
									<div className="flex justify-between sm:block sm:w-1/12 sm:text-right text-gray-400">
										<span className="sm:hidden font-semibold">Daviplata:</span>
										<span className="text-blue-400 font-mono">
											{formatearPesos(item.ventasDaviplata || 0)}
										</span>
									</div>

									{/* Total Neto */}
									<div className="flex justify-between col-span-2 border-t border-gray-700 pt-2 mt-2 sm:mt-0 sm:pt-0 sm:border-t-0 sm:block sm:w-3/12 sm:text-right font-bold text-white">
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
									<div className="flex justify-between col-span-2 sm:block sm:w-3/12 sm:text-right font-bold text-white">
										<span className="sm:hidden font-semibold">
											Cuadre Efec.:
										</span>
										<Tooltip
											text={`Base (${formatearPesos(
												item.baseEfectivo || 0
											)}) + Venta Efectivo (${formatearPesos(
												item.ventasEfectivo || 0
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
						<UsersIcon className="w-8 h-8 mx-auto mb-2 text-red-500" />
						<p className="font-semibold">
							No se encontró actividad para el usuario en el período
							seleccionado.
						</p>
						<p className="text-sm">
							Intenta ajustar el período de tiempo o selecciona "Todos los
							Usuarios".
						</p>
					</div>
				)}
			</div>

			{/* Modal de Ayuda (Se muestra u oculta con el estado) */}
			{showHelp && (
				<HelpModal
					title="Ayuda: Ventas por Usuario"
					onClose={() => setShowHelp(false)}>
					{helpContent}
				</HelpModal>
			)}
		</div>
	);
};

export default VentasPorUsuario;
