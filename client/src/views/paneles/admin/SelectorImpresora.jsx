import { useState } from 'react';
import { useSelector } from 'react-redux';
import { imprimirFacturaBluetooth } from '../../../helpers/ImpresionBlueTooth.jsx';
import { imprimirFacturaWifi } from '../../../helpers/ImpresionWifi.jsx';
import { PrinterIcon, XIcon } from '../../../components/Icons/Icons.jsx';

const SelectorImpresoraModal = ({ factura, onClose }) => {
	// 🚨 Simulamos la obtención de la lista de impresoras guardadas
	const impresorasGuardadas = useSelector(
		(state) => state.impresoras.impresoras
	);
	const [isPrinting, setIsPrinting] = useState(false);

	const handleSelectAndPrint = async (printer) => {
		if (isPrinting) return;

		setIsPrinting(true);
		console.log(
			`Seleccionada impresora: ${printer.nombre} (${printer.modoImpresion})`
		);

		try {
			if (printer.modoImpresion === 'Bluetooth') {
				await imprimirFacturaBluetooth(factura, printer.macAddress);
			} else if (printer.modoImpresion === 'Wifi') {
				await imprimirFacturaWifi(factura, printer.ipAddress, printer.port);
			}
			// Si la impresión tiene éxito, cerramos el modal
			onClose();
		} catch (error) {
			// El error ya es manejado dentro de las funciones de impresión
			console.error('Fallo grave en el flujo de impresión:', error);
		} finally {
			setIsPrinting(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in bg-black/50">
			<div className="bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] w-full max-w-sm rounded-xl border border-gray-700 shadow-2xl animate-fade-in-up relative max-h-[90vh] overflow-hidden flex flex-col">
				{/* Cabecera del Modal */}
				<div className="flex justify-between items-center p-4 border-b border-gray-700 shrink-0">
					<h3 className="text-lg font-bold text-white">
						Seleccionar Impresora
					</h3>
					<button
						onClick={onClose}
						className="p-1 rounded-full hover:bg-gray-700 transition-colors">
						<XIcon className="w-5 h-5 text-gray-400 hover:text-white" />
					</button>
				</div>

				{/* Contenido (Lista de Impresoras) */}
				<div className="flex-1 overflow-y-auto p-4 space-y-3">
					{impresorasGuardadas && impresorasGuardadas.length > 0 ? (
						impresorasGuardadas.map((printer) => (
							<button
								key={printer._id}
								onClick={() => handleSelectAndPrint(printer)}
								disabled={isPrinting}
								className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between border-2 ${
									isPrinting
										? 'bg-gray-800/50 text-gray-500 cursor-wait'
										: 'bg-gray-900 hover:bg-red-900/40 border-red-700/50 active:scale-[.98]'
								}`}>
								<div className="flex flex-col">
									<span className="font-bold text-white">{printer.nombre}</span>
									<span className="text-xs text-yellow-400 uppercase">
										{printer.modoImpresion}
									</span>
								</div>
								<PrinterIcon
									className={`w-6 h-6 ${
										isPrinting ? 'text-gray-500' : 'text-red-400'
									}`}
								/>
							</button>
						))
					) : (
						<div className="text-center p-8 bg-gray-900/50 rounded-lg text-gray-400">
							<p className="font-bold">No hay impresoras guardadas.</p>
							<p className="text-sm mt-1">
								Configure una desde la opción del menú principal.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SelectorImpresoraModal;
