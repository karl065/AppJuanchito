import { formatearPesos } from '../../../helpers/formatearPesos';

const AnalisisDeStock = () => (
	<div className="p-3">
		<h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
			Análisis de Inventario
		</h3>
		<div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
			<p className="text-gray-400 text-sm">
				Resumen del valor y estado actual del inventario.
			</p>
			<ul className="mt-3 space-y-2 text-xs text-gray-300">
				<li>
					• Valor total del inventario:{' '}
					<span className="font-bold text-green-400">
						{formatearPesos(1500000)}
					</span>
				</li>
				<li>
					• Unidades totales en stock:{' '}
					<span className="font-bold text-blue-400">845 unds</span>
				</li>
				<li>
					• Productos con stock bajo:{' '}
					<span className="font-bold text-red-400">4 items</span>
				</li>
			</ul>
		</div>
	</div>
);

export default AnalisisDeStock;
