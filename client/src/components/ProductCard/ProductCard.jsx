import { formatearPesos } from '../../helpers/formatearPesos.jsx';

const ProductCard = ({ product, onAdd }) => (
	<div
		onClick={() => onAdd(product)}
		className="bg-gray-800 rounded-xl p-3 shadow-lg border border-gray-700 active:scale-95 transition-transform cursor-pointer flex flex-col justify-between h-32 relative overflow-hidden group">
		<div className="absolute top-0 right-0 p-1 bg-gray-900/80 rounded-bl-lg z-10">
			<span
				className={`text-[10px] font-bold ${
					product.stock <= 0 ? 'text-red-500' : 'text-gray-400'
				}`}>
				{product.stock <= 0 ? 'Agotado' : `${product.stock} disp.`}
			</span>
		</div>
		<div>
			<h4 className="font-bold text-white text-sm leading-tight mb-1 line-clamp-2">
				{product.nombre}
			</h4>
			<span className="text-xs text-gray-400">{product.categoria}</span>
		</div>
		<div className="flex justify-between items-end mt-2">
			<span className="font-bold text-green-400 text-lg">
				{formatearPesos(product.precio)}
			</span>
			<div
				className={`p-1.5 rounded-full text-white shadow-md transition-colors ${
					product.stock <= 0
						? 'bg-gray-600 cursor-not-allowed'
						: 'bg-red-600 group-hover:bg-red-500'
				}`}>
				<PlusIcon className="w-4 h-4" />
			</div>
		</div>
	</div>
);
export default ProductCard;
