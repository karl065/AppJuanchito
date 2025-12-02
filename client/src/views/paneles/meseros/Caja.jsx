import { useSelector } from 'react-redux';
import { CashIcon2, LockIcon } from '../../../components/Icons/Icons.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';

const MiCajaView = () => {
	const cajaActual = useSelector((state) => state.cajas.cajaActual);

	return (
		<div className='p-3 flex flex-col h-full pb-20 bg-gray-900'>
			{/* Tarjeta Principal: Ventas Totales */}
			<div className='bg-[linear-gradient(135deg,#1f2937_0%,#000000_100%)] p-5 rounded-2xl border border-gray-700 shadow-lg mb-4 text-center'>
				<p className='text-gray-400 text-[10px] mb-1 uppercase tracking-widest font-bold'>
					Total Recaudado Hoy
				</p>
				<h2 className='text-3xl font-black text-white mb-2 tracking-tight'>
					{formatearPesos(cajaActual.totalVentas)}
				</h2>
				<div className='flex flex-col items-center gap-1'>
					<span className='inline-block px-3 py-0.5 bg-green-900/30 text-green-400 text-[10px] font-bold rounded-full border border-green-800/50'>
						CAJA ABIERTA
					</span>
					<span className='text-[10px] text-gray-400 font-mono mt-1'>
						Efectivo Neto en Caja:{' '}
						<span className='text-white font-bold'>
							{formatearPesos(
								cajaActual.apertura.baseInicial + cajaActual.totalEfectivo
							)}
						</span>
					</span>
				</div>
			</div>

			{/* Desglose Detallado */}
			<div className='space-y-2 overflow-y-auto flex-1 custom-scrollbar'>
				{/* Base Inicial */}
				<div className='bg-gray-800/60 p-3 rounded-xl flex justify-between items-center border border-gray-700/50'>
					<span className='text-xs text-gray-400 font-medium flex items-center gap-2'>
						<LockIcon className='w-3 h-3 text-gray-500' /> Base Inicial
					</span>
					<span className='font-bold text-sm text-white'>
						{formatearPesos(cajaActual.apertura.baseInicial)}
					</span>
				</div>

				{/* Ventas Efectivo */}
				<div className='bg-gray-800/60 p-3 rounded-xl flex justify-between items-center border border-gray-700/50'>
					<span className='text-xs text-gray-400 font-medium flex items-center gap-2'>
						<CashIcon2 className='w-3 h-3 text-green-500' /> Ventas Efectivo
					</span>
					<span className='font-bold text-sm text-green-400'>
						{formatearPesos(cajaActual.totalEfectivo)}
					</span>
				</div>

				{/* Ventas Nequi */}
				<div className='bg-gray-800/60 p-3 rounded-xl flex justify-between items-center border border-gray-700/50'>
					<span className='text-xs text-gray-400 font-medium flex items-center gap-2'>
						📱 Nequi
					</span>
					<span className='font-bold text-sm text-purple-400'>
						{formatearPesos(cajaActual.totalNequi)}
					</span>
				</div>

				{/* Ventas Daviplata */}
				<div className='bg-gray-800/60 p-3 rounded-xl flex justify-between items-center border border-gray-700/50'>
					<span className='text-xs text-gray-400 font-medium flex items-center gap-2'>
						🔴 Daviplata
					</span>
					<span className='font-bold text-sm text-red-400'>
						{formatearPesos(cajaActual.totalDaviplata)}
					</span>
				</div>

				{/* Total Cambio */}
				<div className='bg-gray-800/60 p-3 rounded-xl flex justify-between items-center border border-red-900/30'>
					<span className='text-xs text-gray-400 font-medium flex items-center gap-2'>
						🔄 Cambio/Vueltas Entregado
					</span>
					<span className='font-bold text-sm text-orange-400'>
						{formatearPesos(10000)}
					</span>
				</div>
			</div>

			<button className='mt-4 w-full py-3.5 bg-red-900/40 border border-red-800 text-red-200 text-xs font-bold rounded-xl hover:bg-red-900/60 active:scale-95 transition-all uppercase tracking-wide'>
				Solicitar Cierre de Turno
			</button>
		</div>
	);
};
export default MiCajaView;
