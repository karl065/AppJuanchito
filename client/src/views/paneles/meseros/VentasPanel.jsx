import { useMemo, useState } from 'react';
import { SearchIcon } from '../../../components/Icons/Icons';

const VentaPanel = ({
	products,
	cart,
	onAdd,
	onUpdateCart,
	onClearCart,
	onSaveSale,
}) => {
	const [categoryFilter, setCategoryFilter] = useState('Todo');
	const [searchTerm, setSearchTerm] = useState('');
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isPaymentOpen, setIsPaymentOpen] = useState(false);

	// Filtrado de productos
	const filteredProducts = useMemo(() => {
		return products.filter((p) => {
			const matchCat =
				categoryFilter === 'Todo' || p.categoria === categoryFilter;
			const matchSearch = p.nombre
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			return matchCat && matchSearch;
		});
	}, [products, categoryFilter, searchTerm]);

	// Totales del carrito
	const cartTotal = cart.reduce(
		(sum, item) => sum + item.precio * item.cantidad,
		0
	);
	const cartItemsCount = cart.reduce((sum, item) => sum + item.cantidad, 0);

	const handleConfirmPayment = (paymentData) => {
		// Guardar venta
		const newSale = {
			items: cart,
			total: cartTotal,
			metodoPago: paymentData.method,
			fecha: new Date().toISOString(),
		};
		onSaveSale(newSale);

		// Resetear UI
		setIsPaymentOpen(false);
		setIsCartOpen(false);
		onClearCart();
	};

	return (
		<div className="flex flex-col h-full relative">
			{/* 1. Barra de Filtros Superior */}
			<div className="p-3 bg-gray-900 sticky top-0 z-10 shadow-lg">
				<div className="relative mb-3">
					<input
						type="text"
						placeholder="Buscar producto..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
					/>
					<SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
				</div>

				<div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
					{MOCK_DATA.categorias.map((cat) => (
						<button
							key={cat}
							onClick={() => setCategoryFilter(cat)}
							className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
								categoryFilter === cat
									? 'bg-red-600 text-white shadow-md'
									: 'bg-gray-800 text-gray-400 border border-gray-700'
							}`}>
							{cat}
						</button>
					))}
				</div>
			</div>

			{/* 2. Grid de Productos */}
			<div className="flex-1 overflow-y-auto p-3 pb-24">
				<div className="grid grid-cols-2 gap-3">
					{filteredProducts.map((p) => (
						<ProductCard key={p._id} product={p} onAdd={onAdd} />
					))}
				</div>
				{/* Espaciador final para no tapar contenido con el botón flotante */}
				<div className="h-20"></div>
			</div>

			{/* 3. Botón Flotante / Resumen Carrito */}
			{cartItemsCount > 0 && (
				<div className="absolute bottom-4 left-3 right-3 z-20">
					<button
						onClick={() => setIsCartOpen(true)}
						className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-xl shadow-2xl flex justify-between items-center transform transition-transform active:scale-95 border border-red-500/50">
						<div className="flex items-center gap-3">
							<div className="bg-white/20 px-3 py-1 rounded-lg font-bold">
								{cartItemsCount}
							</div>
							<span className="font-semibold text-sm">Ver Pedido Actual</span>
						</div>
						<span className="font-extrabold text-xl">
							{formatearPesos(cartTotal)}
						</span>
					</button>
				</div>
			)}

			{/* 4. MODAL CARRITO (Overlay Completo) */}
			{isCartOpen && (
				<div className="fixed inset-0 z-50 bg-gray-900 flex flex-col animate-fade-in-up">
					{/* Header Modal */}
					<div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900">
						<h2 className="text-lg font-bold text-white flex items-center gap-2">
							<CartIcon className="w-5 h-5 text-red-500" />
							Carrito de Compras
						</h2>
						<button
							onClick={() => setIsCartOpen(false)}
							className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white">
							<XIcon className="w-5 h-5" />
						</button>
					</div>

					{/* Lista Items */}
					<div className="flex-1 overflow-y-auto p-4 bg-gray-900">
						{cart.length === 0 ? (
							<div className="text-center text-gray-500 mt-20">
								<CartIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
								<p>No hay productos en el pedido.</p>
							</div>
						) : (
							cart.map((item) => (
								<CartItem
									key={item._id}
									item={item}
									onIncrease={(i) => onUpdateCart(i._id, 1)}
									onDecrease={(i) => onUpdateCart(i._id, -1)}
								/>
							))
						)}
					</div>

					{/* Footer Acciones */}
					{cart.length > 0 && (
						<div className="p-4 bg-gray-800 border-t border-gray-700">
							<div className="flex justify-between items-end mb-4">
								<span className="text-gray-400">Total a Cobrar:</span>
								<span className="text-3xl font-extrabold text-white">
									{formatearPesos(cartTotal)}
								</span>
							</div>
							<div className="grid grid-cols-4 gap-2">
								<button
									onClick={onClearCart}
									className="col-span-1 py-3 rounded-xl border border-red-500/50 text-red-500 font-bold flex justify-center items-center">
									<TrashIcon className="w-5 h-5" />
								</button>
								<button
									onClick={() => setIsPaymentOpen(true)}
									className="col-span-3 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-green-900/30">
									Cobrar
								</button>
							</div>
						</div>
					)}

					{/* SUB-MODAL: PAGO */}
					{isPaymentOpen && (
						<div className="absolute inset-0 z-50 bg-gray-900 p-6 animate-fade-in">
							<PaymentScreen
								total={cartTotal}
								onConfirm={handleConfirmPayment}
								onCancel={() => setIsPaymentOpen(false)}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
export default VentaPanel;
