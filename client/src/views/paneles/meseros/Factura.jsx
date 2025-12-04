import { useState } from 'react';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import {
	BackIcon,
	CheckIcon,
	PrinterIcon,
} from '../../../components/Icons/Icons';

const ModalFactura = ({ carrito, datosPago, total, onBack, onConfirm }) => {
	const [imprimir, setImprimir] = useState(true);

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in'>
			<div className='bg-white w-full max-w-sm rounded-none sm:rounded-lg shadow-2xl flex flex-col max-h-[90vh] text-black font-mono overflow-hidden relative'>
				{/* Header Factura (Estilo Ticket) */}
				<div className='p-4 text-center border-b-2 border-dashed border-gray-300 bg-gray-50'>
					<h2 className='text-xl font-black uppercase'>Juanchito</h2>
					<p className='text-xs text-gray-500'>Cantina Disco</p>
					<p className='text-xs text-gray-500'>{new Date().toLocaleString()}</p>
					<div className='mt-2 inline-block px-2 py-1 bg-black text-white text-xs font-bold rounded'>
						{datosPago.mesa.toUpperCase()}
					</div>
				</div>

				{/* Lista Items */}
				<div className='flex-1 overflow-y-auto p-4 custom-scrollbar text-sm'>
					<table className='w-full mb-4'>
						<thead>
							<tr className='text-left border-b border-black'>
								<th className='pb-1'>Cant</th>
								<th className='pb-1'>Prod</th>
								<th className='text-right pb-1'>Total</th>
							</tr>
						</thead>
						<tbody>
							{carrito.map((item, i) => (
								<tr key={i}>
									<td className='py-1 align-top'>{item.cantidad}</td>
									<td className='py-1 align-top'>{item.nombre}</td>
									<td className='py-1 text-right align-top'>
										{formatearPesos(item.cantidad * item.precio)}
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* Totales */}
					<div className='border-t-2 border-black pt-2 flex justify-between items-center text-lg font-bold'>
						<span>TOTAL A PAGAR</span>
						<span>{formatearPesos(total)}</span>
					</div>

					{/* Desglose Pago */}
					<div className='mt-4 pt-2 border-t border-dashed border-gray-300 text-xs'>
						<p className='font-bold mb-1'>DETALLE DE PAGO:</p>
						{datosPago.metodos.efectivo > 0 && (
							<div className='flex justify-between'>
								<span>Efectivo:</span>
								<span>{formatearPesos(datosPago.metodos.efectivo)}</span>
							</div>
						)}
						{datosPago.metodos.nequi > 0 && (
							<div className='flex justify-between'>
								<span>Nequi:</span>
								<span>{formatearPesos(datosPago.metodos.nequi)}</span>
							</div>
						)}
						{datosPago.metodos.daviplata > 0 && (
							<div className='flex justify-between'>
								<span>Daviplata:</span>
								<span>{formatearPesos(datosPago.metodos.daviplata)}</span>
							</div>
						)}
					</div>

					{/* Cambio */}
					{datosPago.metodos.efectivo > 0 && (
						<div className='mt-2 pt-2 border-t border-dashed border-gray-300'>
							<div className='flex justify-between text-gray-600 text-xs'>
								<span>Efectivo Recibido:</span>
								<span>{formatearPesos(datosPago.dineroEntregado)}</span>
							</div>
							<div className='flex justify-between font-bold text-base mt-1'>
								<span>CAMBIO:</span>
								<span>{formatearPesos(datosPago.cambio)}</span>
							</div>
						</div>
					)}
				</div>

				{/* Footer Actions */}
				<div className='p-4 bg-gray-100 border-t border-gray-300'>
					<div className='flex items-center justify-between mb-4 bg-white p-2 rounded border border-gray-300'>
						<span className='text-xs font-bold flex items-center gap-2'>
							<PrinterIcon className='text-gray-600' />
							Imprimir Recibo
						</span>
						<input
							type='checkbox'
							checked={imprimir}
							onChange={(e) => setImprimir(e.target.checked)}
							className='w-5 h-5 accent-black'
						/>
					</div>

					<div className='grid grid-cols-2 gap-3'>
						<button
							onClick={onBack}
							className='py-3 bg-gray-200 text-gray-800 rounded-lg font-bold text-xs hover:bg-gray-300 transition-colors flex items-center justify-center gap-1'>
							<BackIcon /> Volver
						</button>
						<button
							type='button'
							onClick={() => onConfirm(imprimir)}
							className='py-3 bg-black text-white rounded-lg font-bold text-xs hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center gap-2'>
							CONFIRMAR VENTA <CheckIcon />
						</button>
					</div>
				</div>

				{/* Dientes de papel (Decorativo) */}
				<div className='absolute bottom-0 left-0 right-0 h-1 bg-[radial-gradient(circle,transparent_4px,#f3f4f6_4px)] bg-size-[10px_10px] bg-bottom'></div>
			</div>
		</div>
	);
};
export default ModalFactura;
