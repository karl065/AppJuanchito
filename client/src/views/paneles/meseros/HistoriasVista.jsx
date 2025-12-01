import { formatearPesos } from '../../../helpers/formatearPesos.jsx';

const HistorialView = ({ ventas }) => {
	return (
		<div className="flex flex-col h-full p-3 pb-20 space-y-3 overflow-y-auto bg-gray-900">
			<h2 className="text-lg font-bold text-white pl-1">Ventas de Hoy</h2>

			{ventas.length === 0 ? (
				<div className="flex flex-col items-center justify-center h-64 text-gray-500">
					<p>No hay ventas registradas hoy.</p>
				</div>
			) : (
				ventas.map((venta, idx) => (
					<div
						key={venta._id || idx}
						className="bg-gray-800 p-3 rounded-xl border-l-4 border-gray-600 flex justify-between items-center shadow-sm">
						<div>
							<div className="flex items-center gap-2">
								<h3 className="text-sm font-bold text-white">{venta.mesa}</h3>
								{/* Badges de metodos */}
								<div className="flex gap-1">
									{venta.metodos.efectivo > 0 && (
										<span className="text-[9px] px-1 py-0.5 rounded bg-green-900/30 text-green-400 border border-green-800">
											EFE
										</span>
									)}
									{venta.metodos.nequi > 0 && (
										<span className="text-[9px] px-1 py-0.5 rounded bg-pink-900/30 text-pink-400 border border-pink-800">
											NEQ
										</span>
									)}
									{venta.metodos.daviplata > 0 && (
										<span className="text-[9px] px-1 py-0.5 rounded bg-red-900/30 text-red-400 border border-red-800">
											DAV
										</span>
									)}
								</div>
							</div>
							<p className="text-[10px] text-gray-500 font-mono mt-0.5">
								{venta.hora} • {venta.items || 1} items
							</p>
						</div>
						<div className="text-right">
							<span className="text-base font-bold text-white block">
								{formatearPesos(venta.total)}
							</span>
							{venta.imprimirFactura && (
								<span className="text-[10px] text-gray-600">🖨️ Impreso</span>
							)}
						</div>
					</div>
				))
			)}
		</div>
	);
};
export default HistorialView;
