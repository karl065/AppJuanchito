import { formatearPesos } from '../../helpers/formatearPesos.jsx';
import { MinusIcon, PlusIcon, TrashIcon } from '../Icons/Icons.jsx';

const Carrito = ({ item, onIncrease, onDecrease, onRemove }) => (
	<div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-700 mb-2">
		<div className="flex-1">
			<h4 className="text-white font-medium text-sm">{item.nombre}</h4>
			<span className="text-green-400 text-xs font-bold">
				{formatearPesos(item.precio * item.cantidad)}
			</span>
		</div>
		<div className="flex items-center gap-3 bg-gray-900 rounded-lg p-1">
			<button
				onClick={() => onDecrease(item)}
				className="p-1 text-red-400 hover:text-white hover:bg-red-600 rounded transition-colors">
				{item.cantidad === 1 ? (
					<TrashIcon className="w-4 h-4" />
				) : (
					<MinusIcon className="w-4 h-4" />
				)}
			</button>
			<span className="text-white font-bold w-4 text-center text-sm">
				{item.cantidad}
			</span>
			<button
				onClick={() => onIncrease(item)}
				className="p-1 text-green-400 hover:text-white hover:bg-green-600 rounded transition-colors">
				<PlusIcon className="w-4 h-4" />
			</button>
		</div>
	</div>
);
export default Carrito;
