import {
	ArrowDownIcon,
	ArrowUpIcon,
	XIcon,
} from '../../../components/Icons/Icons.jsx';
import {
	getInputClasses,
	getLabelClasses,
} from '../../../helpers/estilosGlobales.jsx';
import { formatearFechaHora } from '../../../helpers/formatearFechaHora.jsx';
import { getTipoClase } from '../../../helpers/getTipoClases.jsx';

const DetalleMovimiento = ({ movimiento, onClose }) => {
	if (!movimiento) return null;

	const {
		_id,
		salida,
		entrada,
		descripcion,
		tipo,
		producto,
		usuario,
		createdAt,
	} = movimiento;

	const esSalida = salida > 0;
	const cantidad = esSalida ? salida : entrada || 0;
	const tipoMovimiento = esSalida ? 'Salida' : 'Entrada';

	// Obtener estilo de ícono
	const IconoMovimiento = esSalida ? ArrowUpIcon : ArrowDownIcon;
	const iconColor = esSalida ? 'text-red-400' : 'text-green-400';

	return (
		<div className="flex flex-col h-full bg-[linear-gradient(180deg,#000000_0%,#1a0000_100%)] w-full max-w-sm mx-auto rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
			{/* HEADER */}
			<div className="flex justify-between items-center p-4 border-b border-red-900/30 bg-black/40 backdrop-blur-sm shrink-0">
				<div className="flex items-center gap-3">
					<IconoMovimiento className={`w-6 h-6 ${iconColor}`} />
					<div>
						<h3 className="text-lg font-bold text-white">
							Detalle de Movimiento
						</h3>
						<p className="text-[10px] text-gray-500 font-mono">
							ID: {_id ? _id.slice(-6).toUpperCase() : 'N/A'}
						</p>
					</div>
				</div>
				<button
					onClick={onClose}
					className="p-2 rounded-full hover:bg-red-900/20 text-gray-400 hover:text-white transition-colors">
					<XIcon className="w-5 h-5" />
				</button>
			</div>

			{/* CONTENIDO SCROLLABLE */}
			<div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
				{/* 1. PRODUCTO */}
				<div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-inner">
					<label className={getLabelClasses('text-red-400')}>
						Producto Involucrado
					</label>
					<p className="text-lg font-black text-white">
						{producto?.nombre || 'Producto Desconocido'}
					</p>
					<p className="text-xs text-gray-500 mt-1">Ref. {_id.slice(0, 8)}</p>

					<div className="grid grid-cols-2 gap-3 mt-3 text-xs">
						<div className="bg-gray-900 p-2 rounded-lg">
							<label className={getLabelClasses()}>Unidad</label>
							<p className="font-semibold">{producto?.unidadMedida || 'N/A'}</p>
						</div>
						<div className="bg-gray-900 p-2 rounded-lg">
							<label className={getLabelClasses()}>Stock Actual</label>
							<p className="font-semibold">{producto?.stock || 0}</p>
						</div>
					</div>
				</div>

				{/* 2. DETALLE DEL MOVIMIENTO */}
				<div className="space-y-3">
					<div
						className={`p-4 rounded-xl shadow-lg border-l-4 ${getTipoClase(
							tipo
						)}`}>
						<label className={getLabelClasses('text-white')}>
							Tipo y Cantidad
						</label>
						<div className="flex justify-between items-center">
							<p className="text-xl font-black uppercase">{tipo}</p>
							<p className="text-2xl font-black">
								{cantidad}{' '}
								<span className="text-sm font-light">
									{producto?.unidadMedida || 'unds'}
								</span>
							</p>
						</div>
					</div>

					{/* Descripción */}
					<div>
						<label className={getLabelClasses()}>Descripción/Motivo</label>
						<div className={`${getInputClasses} h-auto min-h-10 py-3`}>
							{descripcion || 'Sin descripción detallada.'}
						</div>
					</div>
				</div>

				{/* 3. INFO DE TRAZABILIDAD */}
				<div className="space-y-2 text-xs">
					<label className={getLabelClasses('text-white')}>Trazabilidad</label>
					<div className="grid grid-cols-1 gap-2 bg-gray-800/50 p-3 rounded-xl border border-gray-700">
						<div className="flex justify-between items-center">
							<span className="text-gray-500">Realizado por:</span>
							<span className="font-semibold text-white truncate">
								{usuario?.nombre || 'Desconocido'}
							</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="text-gray-500">Rol:</span>
							<span className="font-semibold text-white">
								{usuario?.role || 'N/A'}
							</span>
						</div>

						<div className="flex justify-between items-center border-t border-gray-700/50 pt-2 mt-2">
							<span className="text-gray-500">Fecha y Hora:</span>
							<span className="font-semibold text-white">
								{formatearFechaHora(createdAt)}
							</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="text-gray-500">Tipo de Operación:</span>
							<span className="font-semibold text-white">{tipoMovimiento}</span>
						</div>
					</div>
				</div>
			</div>

			{/* FOOTER - BOTÓN DE CERRAR */}
			<div className="p-4 border-t border-gray-800 bg-black/40 backdrop-blur-md flex shrink-0">
				<button
					onClick={onClose}
					className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-bold transition-all active:scale-95 shadow-lg">
					Cerrar Detalle
				</button>
			</div>
		</div>
	);
};

export default DetalleMovimiento;
