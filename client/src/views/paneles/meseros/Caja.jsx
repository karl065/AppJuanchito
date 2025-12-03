import { useSelector } from 'react-redux';
import { CashIcon2, LockIcon } from '../../../components/Icons/Icons.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import { useMemo } from 'react';

const MiCajaView = () => {
	const cajaActual = useSelector((state) => state.cajas.cajaActual);

	// 👇 Lógica para calcular el cambio total
	const totalCambio = useMemo(() => {
		// Aseguramos que cajaActual y cajaActual.facturas existan antes de intentar sumar
		if (!cajaActual?.facturas || cajaActual.facturas.length === 0) {
			return 0;
		}

		return cajaActual.facturas.reduce((acc, factura) => {
			// Sumamos el valor 'cambio' de cada detallePago
			return acc + (factura.detallePago?.cambio || 0);
		}, 0);
	}, [cajaActual.facturas]);

	return (
		<div className='p-3 flex flex-col h-full  pb-20 '>
			{/* Tarjeta Principal: Ventas Totales */}
			<div className=' p-5 rounded-2xl border border-gray-700 shadow-lg mb-4 text-center'>
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
								cajaActual.apertura?.baseInicial + cajaActual.totalEfectivo
							)}
						</span>
					</span>
				</div>
			</div>

			{/* Desglose Detallado */}
			<div className='space-y-2 rounded-2xl border border-gray-700 h-full p-2 overflow-y-auto flex-1 custom-scrollbar'>
				{/* Base Inicial */}
				<div className='p-3 rounded-xl flex justify-between items-center border border-gray-700/50'>
					<span className='text-xs text-gray-400 font-medium flex items-center gap-2'>
						<LockIcon className='w-3 h-3 text-gray-500' /> Base Inicial
					</span>
					<span className='font-bold text-sm text-white'>
						{formatearPesos(cajaActual.apertura?.baseInicial)}
					</span>
				</div>

				{/* Ventas Efectivo */}
				<div className=' p-3 rounded-xl flex justify-between items-center border border-gray-700/50'>
					<span className='text-xs text-gray-400 font-medium flex items-center gap-2'>
						<CashIcon2 className='w-3 h-3 text-green-500' /> Ventas Efectivo
					</span>
					<span className='font-bold text-sm text-green-400'>
						{formatearPesos(cajaActual.totalEfectivo)}
					</span>
				</div>

				{/* Ventas Nequi */}
				<div className=' p-3 rounded-xl flex justify-between items-center border border-gray-700/50'>
					<span className='text-xs text-gray-400 font-medium flex items-center gap-2'>
						📱 Nequi
					</span>
					<span className='font-bold text-sm text-purple-400'>
						{formatearPesos(cajaActual.totalNequi)}
					</span>
				</div>

				{/* Ventas Daviplata */}
				<div className=' p-3 rounded-xl flex justify-between items-center border border-gray-700/50'>
					<span className='text-xs text-gray-400 font-medium flex items-center gap-2'>
						🔴 Daviplata
					</span>
					<span className='font-bold text-sm text-red-400'>
						{formatearPesos(cajaActual.totalDaviplata)}
					</span>
				</div>

				{/* Total Cambio */}
				<div className=' p-3 rounded-xl flex justify-between items-center border border-red-900/30'>
					<span className='text-xs text-gray-400 font-medium flex items-center gap-2'>
						🔄 Cambio/Vueltas Entregado
					</span>
					<span className='font-bold text-sm text-orange-400'>
						{formatearPesos(totalCambio)}
					</span>
				</div>
			</div>
		</div>
	);
};
export default MiCajaView;
