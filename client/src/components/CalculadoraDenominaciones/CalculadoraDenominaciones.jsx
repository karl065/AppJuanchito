import { useMemo, useState } from 'react';
import { DENOMINACIONES } from '../../helpers/denominaciones.jsx';
import { formatearPesos } from '../../helpers/formatearPesos.jsx';
import { CalculatorIcon, CheckIcon2, XIcon2 } from '../Icons/Icons.jsx';

const ModalCalculadoraDenominaciones = ({
	onClose,
	onConfirm,
	initialData,
}) => {
	const [conteo, setConteo] = useState(initialData || {});

	// Calcular total en tiempo real
	const totalCalculado = useMemo(() => {
		return DENOMINACIONES.reduce((acc, denom) => {
			const cantidad = Number(conteo[denom.valor]) || 0;
			return acc + denom.valor * cantidad;
		}, 0);
	}, [conteo]);

	const handleChange = (valor, cantidad) => {
		if (cantidad < 0) return;
		setConteo((prev) => ({ ...prev, [valor]: cantidad }));
	};

	return (
		<div className='fixed inset-0 z-70 flex items-end sm:items-center justify-center backdrop-blur-md p-0 sm:p-4 animate-in fade-in zoom-in-95 duration-200'>
			<div className=' w-full max-w-lg rounded-t-2xl sm:rounded-2xl border border-gray-700 shadow-2xl flex flex-col h-[95dvh] sm:h-[90vh] overflow-hidden'>
				{/* Header Calculadora */}
				<div className='p-4  border-b border-gray-800 flex justify-between items-center shrink-0'>
					<div className='flex items-center gap-3'>
						<div className='bg-yellow-500/20 p-2 rounded-lg'>
							<CalculatorIcon className='text-yellow-400 text-xl' />
						</div>
						<div>
							<h3 className='text-lg font-black text-white leading-none uppercase tracking-wide'>
								Calculadora
							</h3>
							<p className='text-[10px] text-gray-500 font-bold mt-1'>
								Conteo de Efectivo por Denominación
							</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className=' hover:bg-gray-700 text-white p-2 rounded-full transition-colors'>
						<XIcon2 />
					</button>
				</div>

				{/* Total Flotante */}
				<div className=' border-b border-gray-800 p-4 sticky top-0 z-10 text-center shadow-lg'>
					<span className='text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1'>
						Total Calculado
					</span>
					<span className='text-4xl font-black text-yellow-400 block tracking-tighter drop-shadow-sm'>
						{formatearPesos(totalCalculado)}
					</span>
				</div>

				{/* Grid de Billetes y Monedas */}
				<div className='flex-1 overflow-y-auto p-4 custom-scrollbar bg-black/20'>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
						{DENOMINACIONES.map((denom) => {
							const cantidad = conteo[denom.valor] || '';
							const subtotal = (Number(cantidad) || 0) * denom.valor;

							return (
								<div
									key={denom.valor}
									className='flex items-center gap-3 bg-gray-800/40 p-2 rounded-xl border border-gray-700/50 hover:bg-gray-800 transition-all group relative'>
									{/* Visualización Gráfica (Billete o Moneda) */}
									<div
										className={`
                                        flex items-center justify-center font-black text-xs shadow-md shrink-0 relative overflow-hidden
                                        ${
																					denom.tipo === 'billete'
																						? `w-16 h-8 rounded bg-linear-to-br ${denom.color} ${denom.text} border border-white/10`
																						: `w-9 h-9 rounded-full ${denom.color} ${denom.text} border-2 border-dashed border-black/20`
																				}
                                    `}>
										{/* Marca de agua o detalle visual */}
										<span className='z-10 drop-shadow-md'>
											{denom.tipo === 'billete'
												? `$${denom.valor / 1000}k`
												: `$${denom.valor}`}
										</span>
										{denom.tipo === 'billete' && (
											<div className='absolute -right-2 -bottom-2 text-4xl opacity-20 rotate-12'>
												💲
											</div>
										)}
									</div>

									{/* Subtotal por fila: POSICIONAMIENTO ABSOLUTO Y ESTILO DE INDICADOR */}
									{subtotal > 0 && (
										<div className='absolute -bottom-2 -left-2 bg-green-500 px-1.5 py-0.5 rounded-full shadow-lg'>
											<span className='text-[8px] font-black text-black block'>
												{formatearPesos(subtotal)}
											</span>
										</div>
									)}

									{/* Input y Multiplicador */}
									<div className='flex-1 flex items-center justify-end gap-2'>
										<span className='text-gray-600 text-[10px] font-bold uppercase'>
											Cant:
										</span>
										<input
											type='number'
											inputMode='numeric'
											placeholder='0'
											value={cantidad}
											onChange={(e) =>
												handleChange(denom.valor, e.target.value)
											}
											className={`
                                                w-16 bg-gray-950 border border-gray-700 rounded-lg text-center text-white font-bold py-1.5 
                                                focus:border-white focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all
                                                ${cantidad > 0 ? 'text-yellow-400 border-yellow-900/50 bg-yellow-900/10' : ''}
                                            `}
											onFocus={(e) => e.target.select()}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Footer Actions */}
				<div className='p-4  border-t border-gray-800 flex gap-3 shrink-0'>
					<button
						onClick={() => setConteo({})}
						className='px-4 py-3 rounded-xl bg-gray-900 text-gray-400 hover:text-white font-bold text-xs border border-gray-700 transition-colors'>
						Limpiar
					</button>
					<button
						onClick={() => onConfirm(totalCalculado, conteo)}
						className='flex-1 bg-[linear-gradient(60deg,#2b0000_0%,#0a0000_50%,#000000_100%)] text-white font-black rounded-xl shadow-lg shadow-yellow-900/20 flex items-center justify-center gap-2 text-sm uppercase tracking-wide transition-all active:scale-95'>
						<CheckIcon2 className='text-lg' />
						Confirmar Total
					</button>
				</div>
			</div>
		</div>
	);
};
export default ModalCalculadoraDenominaciones;
