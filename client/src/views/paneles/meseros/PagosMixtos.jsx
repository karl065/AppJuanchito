/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { formatearPesos } from '../../../helpers/formatearPesos';
import { ArrowRightIcon, XIcon } from '../../../components/Icons/Icons';

const ModalPagosMixtos = ({ total, onClose, onNext }) => {
	const [mesa, setMesa] = useState('');
	// Montos a pagar por método (la suma debe dar el total)
	const [pagos, setPagos] = useState({ efectivo: 0, nequi: 0, daviplata: 0 });
	// Dinero físico entregado por el cliente (para calcular cambio)
	const [dineroEntregado, setDineroEntregado] = useState('');

	// Inicializar efectivo con el total al abrir
	useEffect(() => {
		setPagos((prev) => ({ ...prev, efectivo: total }));
	}, [total]);

	const handleChangePago = (metodo, valor) => {
		const val = parseInt(valor) || 0;
		setPagos((prev) => ({ ...prev, [metodo]: val }));
	};

	// Cálculos
	const sumaPagos = pagos.efectivo + pagos.nequi + pagos.daviplata;
	const faltante = total - sumaPagos;
	const cambio = (parseInt(dineroEntregado) || 0) - pagos.efectivo;

	const esValido =
		sumaPagos === total &&
		mesa.trim() !== '' &&
		(pagos.efectivo === 0 || cambio >= 0);

	return (
		<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
			<div className="bg-[linear-gradient(180deg,#1a1a1a_0%,#000000_100%)] w-full max-w-sm rounded-t-2xl sm:rounded-2xl border-t sm:border border-gray-700 shadow-2xl flex flex-col max-h-[90dvh]">
				{/* Header */}
				<div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 rounded-t-2xl">
					<div>
						<h3 className="text-lg font-bold text-white">Métodos de Pago</h3>
						<p className="text-xs text-gray-400">
							Total a Pagar:{' '}
							<span className="text-green-400 font-bold text-sm">
								{formatearPesos(total)}
							</span>
						</p>
					</div>
					<button onClick={onClose} className="text-gray-400 hover:text-white">
						<XIcon className="w-6 h-6" />
					</button>
				</div>

				{/* Body */}
				<div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-5">
					{/* Referencia */}
					<div>
						<label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">
							Referencia (Mesa / Barra)
						</label>
						<input
							type="text"
							placeholder="Ej: Barra 1"
							autoFocus
							className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:border-red-500 outline-none text-sm font-bold"
							value={mesa}
							onChange={(e) => setMesa(e.target.value)}
						/>
					</div>

					{/* Inputs de Pagos */}
					<div className="space-y-3">
						<label className="text-[10px] font-bold text-gray-400 uppercase block">
							Distribución del Pago
						</label>

						{/* Fila Nequi */}
						<div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-xl border border-gray-700">
							<span className="text-2xl">📱</span>
							<div className="flex-1">
								<span className="text-xs text-gray-300 block font-bold">
									Nequi
								</span>
								<input
									type="number"
									className="bg-transparent w-full text-white outline-none text-sm font-mono placeholder-gray-600"
									placeholder="0"
									value={pagos.nequi || ''}
									onChange={(e) => handleChangePago('nequi', e.target.value)}
								/>
							</div>
						</div>

						{/* Fila Daviplata */}
						<div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-xl border border-gray-700">
							<span className="text-2xl">🔴</span>
							<div className="flex-1">
								<span className="text-xs text-gray-300 block font-bold">
									Daviplata
								</span>
								<input
									type="number"
									className="bg-transparent w-full text-white outline-none text-sm font-mono placeholder-gray-600"
									placeholder="0"
									value={pagos.daviplata || ''}
									onChange={(e) =>
										handleChangePago('daviplata', e.target.value)
									}
								/>
							</div>
						</div>

						{/* Fila Efectivo (Calculado o Manual) */}
						<div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-xl border border-gray-700">
							<span className="text-2xl">💵</span>
							<div className="flex-1">
								<span className="text-xs text-gray-300 block font-bold">
									Efectivo (Monto a cubrir)
								</span>
								<input
									type="number"
									className="bg-transparent w-full text-white outline-none text-sm font-mono placeholder-gray-600"
									placeholder="0"
									value={pagos.efectivo || ''}
									onChange={(e) => handleChangePago('efectivo', e.target.value)}
								/>
							</div>
						</div>
					</div>

					{/* Alerta de Cuadre */}
					{faltante !== 0 && (
						<div
							className={`text-center text-xs font-bold py-1 rounded ${
								faltante > 0
									? 'text-red-400 bg-red-900/20'
									: 'text-yellow-400 bg-yellow-900/20'
							}`}>
							{faltante > 0
								? `Faltan: ${formatearPesos(faltante)}`
								: `Sobran: ${formatearPesos(Math.abs(faltante))}`}
						</div>
					)}

					{/* Sección de Cambio (Solo si paga algo en efectivo) */}
					{pagos.efectivo > 0 && (
						<div className="bg-gray-800 p-3 rounded-xl border border-gray-600 mt-2 animate-fade-in">
							<label className="text-[10px] font-bold text-green-400 uppercase mb-1 block">
								¿Con cuánto paga en efectivo?
							</label>
							<input
								type="number"
								className="w-full bg-black text-white p-3 rounded-lg border border-gray-700 focus:border-green-500 outline-none text-xl font-bold text-center tracking-widest"
								placeholder={pagos.efectivo}
								value={dineroEntregado}
								onChange={(e) => setDineroEntregado(e.target.value)}
							/>
							<div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-700">
								<span className="text-xs text-gray-400 uppercase font-bold">
									Cambio a devolver:
								</span>
								<span
									className={`text-xl font-black ${
										cambio < 0 ? 'text-red-500' : 'text-green-400'
									}`}>
									{formatearPesos(cambio > 0 ? cambio : 0)}
								</span>
							</div>
						</div>
					)}
				</div>

				{/* Footer Actions */}
				<div className="p-4 bg-gray-900 border-t border-gray-800 flex gap-3">
					<button
						onClick={() =>
							onNext({
								mesa,
								metodos: pagos,
								dineroEntregado: parseInt(dineroEntregado) || 0,
								cambio: cambio > 0 ? cambio : 0,
							})
						}
						disabled={!esValido}
						className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all ${
							esValido
								? 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/40 active:scale-95'
								: 'bg-gray-800 text-gray-500 cursor-not-allowed'
						}`}>
						<span>Ver Factura</span>
						<ArrowRightIcon className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
};
export default ModalPagosMixtos;
