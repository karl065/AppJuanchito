import { formatearPesos } from '../../../helpers/formatearPesos';

const MiCajaView = ({ totalVentas, cajaActual }) => {
	return (
		<div className='p-3 flex flex-col h-full pb-20 bg-gray-900'>
			<div className='bg-[linear-gradient(135deg,#1f2937_0%,#000000_100%)] p-5 rounded-2xl border border-gray-700 shadow-lg mb-4 text-center'>
				<p className='text-gray-400 text-[10px] mb-1 uppercase tracking-widest font-bold'>
					Total Recaudado Hoy
				</p>
				<h2 className='text-3xl font-black text-white mb-2 tracking-tight'>
					{formatearPesos(cajaActual.apertura.baseInicial + totalVentas)}
				</h2>
				<span className='inline-block px-3 py-0.5 bg-green-900/30 text-green-400 text-[10px] font-bold rounded-full border border-green-800/50'>
					CAJA ABIERTA
				</span>
			</div>

			<div className='space-y-2'>
				<div className='bg-gray-800/60 p-3 rounded-xl flex justify-between items-center border border-gray-700/50'>
					<span className='text-xs text-gray-400 font-medium'>
						Base Inicial
					</span>
					<span className='font-bold text-sm text-white'>
						{formatearPesos(cajaActual.apertura.baseInicial)}
					</span>
				</div>
				<div className='bg-gray-800/60 p-3 rounded-xl flex justify-between items-center border border-gray-700/50'>
					<span className='text-xs text-gray-400 font-medium'>
						Ventas Totales
					</span>
					<span className='font-bold text-sm text-green-400'>
						{formatearPesos(totalVentas)}
					</span>
				</div>
			</div>

			<button className='mt-auto w-full py-3.5 bg-red-900/40 border border-red-800 text-red-200 text-xs font-bold rounded-xl hover:bg-red-900/60 active:scale-95 transition-all uppercase tracking-wide'>
				Solicitar Cierre de Turno
			</button>
		</div>
	);
};
export default MiCajaView;
