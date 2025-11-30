import { useState } from 'react';
import { PrinterIcon, XIcon } from '../../../components/Icons/Icons.jsx';
import { getInputClasses } from '../../../helpers/estilosGlobales.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import { formatearFechaHora } from '../../../helpers/formatearFechaHora.jsx';
import SelectorImpresoraModal from './SelectorImpresora.jsx';

const DetalleFactura = ({ factura, onClose }) => {
	// 🚨 ESTADO PARA EL MODAL DE SELECCIÓN DE IMPRESORA
	const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

	if (!factura) return null;

	// Formatear Fecha de forma segura
	const fecha = factura.createdAt
		? formatearFechaHora(factura.createdAt)
		: 'Fecha desconocida';

	// 🚨 Función que abre el modal de selección
	const handlePrint = () => {
		setIsPrintModalOpen(true);
	};

	// Función para cerrar el modal de selección
	const handleClosePrintModal = () => {
		setIsPrintModalOpen(false);
	};

	return (
		// Usamos el diseño del modal que ya tienes
		<div className="flex flex-col h-full bg-[linear-gradient(180deg,#1a0000_0%,#000000_100%)] w-full max-w-md mx-auto rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
			{/* HEADER */}
			<div className="flex justify-between items-center p-4 border-b border-red-900/30 bg-black/40 backdrop-blur-sm shrink-0">
				<div>
					<h3 className="text-lg font-bold text-white">Detalle de Factura</h3>
					<p className="text-[10px] text-gray-500 font-mono">
						ID: {factura._id ? factura._id.slice(-6).toUpperCase() : 'N/A'}
					</p>
				</div>
				<div className="flex gap-2">
					{/* Botón Imprimir en Header: Ahora abre el modal */}
					<button
						onClick={handlePrint}
						className="p-2 rounded-full hover:bg-blue-900/20 text-gray-400 hover:text-blue-400 transition-colors"
						title="Imprimir">
						<PrinterIcon className="w-5 h-5" />
					</button>
					<button
						onClick={onClose}
						className="p-2 rounded-full hover:bg-red-900/20 text-gray-400 hover:text-white transition-colors">
						<XIcon className="w-5 h-5" />
					</button>
				</div>
			</div>

			{/* CONTENIDO SCROLLABLE */}
			<div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-5">
				{/* INFO GENERAL... (cuerpo de la factura) */}
				<div className="grid grid-cols-2 gap-3">
					<div>
						<label className="text-[10px] font-bold text-white mb-1 ml-1 uppercase tracking-wider">
							Fecha
						</label>
						<div className={`${getInputClasses} text-xs`}>{fecha}</div>
					</div>
					<div>
						<label className="text-[10px] font-bold text-white mb-1 ml-1 uppercase tracking-wider">
							Atendido por
						</label>
						<div
							className={`${getInputClasses} text-xs truncate`}
							title={factura.usuario?.nombre}>
							{factura.usuario?.nombre || 'Desconocido'}
						</div>
					</div>
				</div>

				{/* OBSERVACIONES */}
				{factura.observaciones && (
					<div>
						<label className="text-[10px] font-bold text-white mb-1 ml-1 uppercase tracking-wider">
							Observaciones
						</label>
						<div className={`${getInputClasses} text-xs italic text-gray-400`}>
							{factura.observaciones}
						</div>
					</div>
				)}

				{/* PRODUCTOS */}
				<div>
					<label className="text-[10px] font-bold text-white mb-1 ml-1 uppercase tracking-wider">
						Productos ({factura.productos?.length || 0})
					</label>
					<div className="space-y-2 mt-1">
						{factura.productos &&
							factura.productos.map((item, index) => (
								<div
									key={item._id || index}
									className="bg-gray-900/80 p-3 rounded-lg border border-gray-800 flex justify-between items-center shadow-lg hover:border-red-900/40 transition-colors">
									<div className="flex flex-col">
										<span className="text-sm font-bold text-white text-pretty max-w-[180px]">
											{item.producto?.nombre || 'Producto eliminado'}
										</span>
										<span className="text-[10px] text-gray-500">
											{item.cantidad} x {formatearPesos(item.precioUnitario)}
										</span>
									</div>
									<div className="text-sm font-bold text-red-400">
										{formatearPesos(item.precioTotalProducto)}
									</div>
								</div>
							))}
					</div>
				</div>

				{/* RESUMEN FINANCIERO */}
				<div className="border-t border-dashed border-gray-700 pt-4 mt-2">
					<label className="text-[10px] font-bold text-white mb-1 ml-1 uppercase tracking-wider">
						Resumen de Pago
					</label>
					<div className="bg-black/40 rounded-xl p-4 border border-red-900/20 space-y-2">
						<div className="flex justify-between items-center text-xs">
							<span className="text-gray-400">Método de Pago:</span>
							<span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-600 text-white uppercase font-bold text-[10px]">
								{factura.metodoPago}
							</span>
						</div>
						{factura.detallePago?.efectivoCliente > 0 && (
							<div className="flex justify-between items-center text-xs">
								<span className="text-gray-400">Efectivo Recibido:</span>
								<span className="text-gray-300">
									{formatearPesos(factura.detallePago.efectivoCliente)}
								</span>
							</div>
						)}
						{factura.detallePago?.cambio > 0 && (
							<div className="flex justify-between items-center bg-gray-800/50 p-2 rounded-lg mt-2 border border-green-900/30">
								<span className="text-xs font-bold text-green-400">
									Cambio / Vueltas
								</span>
								<span className="text-sm font-bold text-green-400">
									{formatearPesos(factura.detallePago.cambio)}
								</span>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* FOOTER */}
			<div className="p-4 border-t border-gray-800 bg-black/40 backdrop-blur-md flex gap-3 shrink-0">
				{/* Botón Imprimir grande: Ahora abre el modal */}
				<button
					onClick={handlePrint}
					className="flex-1 py-3 rounded-xl bg-blue-900/40 hover:bg-blue-800/40 border border-blue-800 text-blue-200 font-bold transition-all active:scale-95 shadow-lg flex justify-center items-center gap-2">
					<PrinterIcon className="w-5 h-5" /> Re-Imprimir
				</button>
				<button
					onClick={onClose}
					className="flex-1 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-bold transition-all active:scale-95 shadow-lg">
					Cerrar
				</button>
			</div>

			{/* 🚨 MODAL DE SELECCIÓN DE IMPRESORA (Renderizado e Integrado) */}
			{isPrintModalOpen && (
				<SelectorImpresoraModal
					factura={factura}
					onClose={handleClosePrintModal}
				/>
			)}
		</div>
	);
};

export default DetalleFactura;
