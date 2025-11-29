import { useState } from 'react';
import HelpModal from '../../../components/HelpModal/HelpModal.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import Tooltip from '../../../components/Tooltip/Tooltip.jsx';
import { InfoIcon } from '../../../components/Icons/Icons.jsx';

const AnalisisDeStock = ({ analisisStock }) => {
	const [showHelp, setShowHelp] = useState(false);

	const helpContent = (
		<div className="space-y-3">
			<p className="font-semibold text-red-300">
				Este informe proporciona un resumen rápido del estado actual de tu
				inventario.
			</p>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Valor Total del Inventario:</p>
				<p>
					El valor total monetario de todos los productos actualmente en stock
					(Stock * Precio de Venta).
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg">
				<p className="font-bold text-white mb-1">Unidades Totales en Stock:</p>
				<p>
					La suma de las cantidades de todos los productos disponibles en
					inventario.
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-red-500">
				<p className="font-bold text-white mb-1">Productos con Stock Bajo:</p>
				<p>
					El número de productos que han caído por debajo del umbral de stock
					bajo (actualmente 10 unidades), requiriendo un pedido de
					reabastecimiento.
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-blue-500">
				<p className="font-bold text-white mb-1">
					Flujo de Préstamos (Periodo):
				</p>
				<p>
					Muestra cuántas unidades se prestaron y cuántas se devolvieron en el
					período seleccionado, permitiendo ver el balance de la actividad (n
					préstamos en el turno/mes).
				</p>
			</div>

			<div className="p-3 bg-gray-900 rounded-lg border-l-4 border-yellow-500">
				<p className="font-bold text-white mb-1">Cortesías (Periodo):</p>
				<p>
					Total de unidades entregadas como cortesía en el período seleccionado.
				</p>
			</div>
		</div>
	);

	return (
		<div className="p-3">
			<div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
				<h3 className="text-xl font-bold text-white">Análisis de Inventario</h3>
				<Tooltip text="Mostrar ayuda para entender las métricas de stock.">
					<button
						onClick={() => setShowHelp(true)}
						className="p-2  rounded-full hover:bg-red-700 transition-colors text-red-500 hover:text-white">
						<InfoIcon className="w-5 h-5" />
					</button>
				</Tooltip>
			</div>

			<div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
				<p className="text-gray-400 text-sm">
					Resumen del valor y estado actual del inventario.
				</p>
				<ul className="mt-3 space-y-2 text-xs text-gray-300">
					<li>
						• Valor total del inventario:
						<span className="font-bold text-green-400">
							{formatearPesos(analisisStock.totalStockValue)}
						</span>
					</li>
					<li>
						• Unidades totales en stock:
						<span className="font-bold text-blue-400">
							{analisisStock.totalStockUnits} unds
						</span>
					</li>
					<li>
						• Productos con stock bajo:
						<span className="font-bold text-red-400">
							{analisisStock.lowStockItems} items
						</span>
					</li>

					{/* 🚨 MÉTRICAS DE FLUJO (Basadas en movimientos anidados) */}
					<div className="border-t border-gray-700 mt-3 pt-2">
						<p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
							Actividad del Periodo
						</p>
						<li>
							• Cortesías entregadas:
							<span className="font-bold text-yellow-400">
								{analisisStock.cortesiasPeriodo} unds
							</span>
						</li>
						<li>
							• Préstamos realizados (Salidas):
							<span className="font-bold text-indigo-400">
								{analisisStock.prestamosSalidaPeriodo} unds
							</span>
						</li>
						<li>
							• Préstamos devueltos (Entradas):
							<span className="font-bold text-green-400">
								{analisisStock.prestamosEntradaPeriodo} unds
							</span>
						</li>
					</div>
				</ul>
			</div>

			{showHelp && (
				<HelpModal
					title="Ayuda: Análisis de Inventario"
					onClose={() => setShowHelp(false)}>
					{helpContent}
				</HelpModal>
			)}
		</div>
	);
};

export default AnalisisDeStock;
