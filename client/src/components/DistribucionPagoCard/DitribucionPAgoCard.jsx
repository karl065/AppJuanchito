import { formatearPesos } from '../../helpers/formatearPesos.jsx';
import ChartContainer from '../ChartContainer/ChartContainer.jsx';

const DistribucionPagoCard = ({ pagos, totalVentas }) => {
	const paymentMethods = [
		{ label: 'Efectivo', key: 'efectivo', color: '#f87171' },
		{ label: 'Nequi', key: 'nequi', color: '#34d399' },
		{ label: 'Daviplata', key: 'daviplata', color: '#60a5fa' },
	];

	const totalEfectivo = pagos.efectivo;
	const totalDigital = (pagos.nequi || 0) + (pagos.daviplata || 0);

	return (
		<ChartContainer title='Distribución por Medio de Pago (Valor Neto)'>
			<p className='text-xs text-gray-400 mb-2'>
				Total en pesos ingresado por cada método.
			</p>
			<div className='space-y-3'>
				{paymentMethods.map((method) => (
					<div key={method.key} className='text-xs'>
						<div className='flex justify-between items-center mb-1'>
							<span className='text-gray-300 font-semibold'>
								{method.label}
							</span>
							<span
								className='font-bold text-lg'
								style={{ color: method.color }}>
								{formatearPesos(pagos[method.key] || 0)}
							</span>
						</div>
						<div className='h-1.5 rounded-full bg-gray-700'>
							<div
								className='h-1.5 rounded-full'
								style={{
									width: `${((pagos[method.key] || 0) / totalVentas) * 100}%`,
									backgroundColor: method.color,
								}}></div>
						</div>
					</div>
				))}
			</div>
			<div className='pt-3 mt-3 border-t border-gray-700/50 text-xs flex justify-between font-bold text-white'>
				<span>
					Efectivo Total:{' '}
					<span className='text-red-400'>{formatearPesos(totalEfectivo)}</span>
				</span>
				<span>
					Digital:{' '}
					<span className='text-green-400'>{formatearPesos(totalDigital)}</span>
				</span>
			</div>
		</ChartContainer>
	);
};

export default DistribucionPagoCard;
