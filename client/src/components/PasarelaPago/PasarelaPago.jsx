import { useState } from 'react';
import { formatearPesos } from '../../helpers/formatearPesos.jsx';
import { CheckCircleIcon, XIcon } from '../Icons/Icons.jsx';

const PasarelaPago = ({ total, onConfirm, onCancel }) => {
	const [method, setMethod] = useState('Efectivo');
	const [received, setReceived] = useState('');

	// Cálculo de cambio solo si es efectivo
	const change =
		method === 'Efectivo' && received
			? Math.max(0, parseInt(received) - total)
			: 0;
	const isValid = method !== 'Efectivo' || parseInt(received) >= total;

	return (
		<div className="flex flex-col h-full">
			<div className="flex justify-between items-center mb-6">
				<h3 className="text-xl font-bold text-white">Procesar Pago</h3>
				<button onClick={onCancel}>
					<XIcon className="w-6 h-6 text-gray-400" />
				</button>
			</div>

			<div className="text-center mb-8">
				<p className="text-gray-400 text-sm mb-1">Total a Pagar</p>
				<h2 className="text-4xl font-extrabold text-green-400">
					{formatearPesos(total)}
				</h2>
			</div>

			<div className="grid grid-cols-3 gap-3 mb-6">
				{['Efectivo', 'Nequi', 'Daviplata'].map((m) => (
					<button
						key={m}
						onClick={() => setMethod(m)}
						className={`py-3 px-2 rounded-xl text-sm font-bold border-2 transition-all ${
							method === m
								? 'border-red-500 bg-red-500/20 text-white'
								: 'border-gray-700 bg-gray-800 text-gray-400'
						}`}>
						{m}
					</button>
				))}
			</div>

			{method === 'Efectivo' && (
				<div className="mb-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
					<label className="block text-xs text-gray-400 mb-2">
						Dinero Recibido
					</label>
					<div className="flex items-center gap-2">
						<span className="text-2xl text-gray-500">$</span>
						<input
							type="number"
							value={received}
							onChange={(e) => setReceived(e.target.value)}
							placeholder="0"
							className="bg-transparent text-3xl font-bold text-white w-full focus:outline-none placeholder-gray-600"
							autoFocus
						/>
					</div>
					{received > 0 && (
						<div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
							<span className="text-gray-400 font-bold">Cambio:</span>
							<span className="text-2xl font-bold text-yellow-400">
								{formatearPesos(change)}
							</span>
						</div>
					)}
				</div>
			)}

			<div className="mt-auto">
				<button
					disabled={!isValid}
					onClick={() =>
						onConfirm({
							method,
							received: method === 'Efectivo' ? received : total,
							change,
						})
					}
					className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 ${
						isValid
							? 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/50'
							: 'bg-gray-700 text-gray-500 cursor-not-allowed'
					}`}>
					<CheckCircleIcon className="w-6 h-6" />
					Confirmar Venta
				</button>
			</div>
		</div>
	);
};
export default PasarelaPago;
