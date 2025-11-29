import { useState } from 'react';

const PrincipalMeseros = () => {
	const [activeTab, setActiveTab] = useState('pos'); // 'pos' | 'history'
	const [cart, setCart] = useState([]);
	const [salesHistory, setSalesHistory] = useState(MOCK_DATA.ventasTurno);

	// --- LÓGICA DEL CARRITO ---
	const addToCart = (product) => {
		setCart((prev) => {
			const existing = prev.find((item) => item._id === product._id);
			if (existing) {
				return prev.map((item) =>
					item._id === product._id
						? { ...item, cantidad: item.cantidad + 1 }
						: item
				);
			}
			return [...prev, { ...product, cantidad: 1 }];
		});
	};

	const updateCartItem = (id, change) => {
		setCart((prev) =>
			prev
				.map((item) => {
					if (item._id === id) {
						const newQty = item.cantidad + change;
						return newQty > 0 ? { ...item, cantidad: newQty } : null; // Eliminar si llega a 0
					}
					return item;
				})
				.filter(Boolean)
		);
	};

	const clearCart = () => setCart([]);

	const handleSaveSale = (saleData) => {
		// Simular ID único
		const newSaleWithId = { ...saleData, id: `v${Date.now()}` };
		setSalesHistory((prev) => [...prev, newSaleWithId]);
		// Aquí iría la llamada al backend para guardar la venta real
	};

	return (
		<div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans">
			{/* 1. TOP BAR (Fijo) */}
			<div className="bg-gray-900 border-b border-gray-800 p-3 flex justify-between items-center h-14">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-sm">
						{MOCK_DATA.usuario.nombre.charAt(0)}
					</div>
					<div>
						<p className="text-xs text-gray-400 leading-none mb-0.5">
							Atendiendo:
						</p>
						<p className="text-sm font-bold leading-none">
							{MOCK_DATA.usuario.nombre}
						</p>
					</div>
				</div>
				<div className="text-right">
					<span className="text-[10px] bg-green-900 text-green-400 px-2 py-0.5 rounded-full border border-green-700">
						Turno Activo
					</span>
				</div>
			</div>

			{/* 2. ÁREA DE CONTENIDO (Scrollable) */}
			<div className="flex-1 overflow-hidden relative">
				{activeTab === 'pos' ? (
					<VentaPanel
						products={MOCK_DATA.productos}
						cart={cart}
						onAdd={addToCart}
						onUpdateCart={updateCartItem}
						onClearCart={clearCart}
						onSaveSale={handleSaveSale}
					/>
				) : (
					<HistorialVentas sales={salesHistory} />
				)}
			</div>

			{/* 3. BOTTOM NAVIGATION (Fijo) */}
			<div className="bg-gray-900 border-t border-gray-800 h-16 flex justify-around items-center px-2 shadow-2xl z-40">
				<button
					onClick={() => setActiveTab('pos')}
					className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
						activeTab === 'pos' ? 'text-red-500' : 'text-gray-500'
					}`}>
					<HomeIcon
						className={`w-6 h-6 ${
							activeTab === 'pos' && 'fill-current opacity-20'
						}`}
					/>
					<span className="text-[10px] font-bold">Vender</span>
				</button>

				<button
					onClick={() => setActiveTab('history')}
					className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
						activeTab === 'history' ? 'text-red-500' : 'text-gray-500'
					}`}>
					<ListIcon
						className={`w-6 h-6 ${
							activeTab === 'history' && 'fill-current opacity-20'
						}`}
					/>
					<span className="text-[10px] font-bold">Mis Ventas</span>
				</button>
			</div>
		</div>
	);
};

export default PrincipalMeseros;
