import { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import ModalPagosMixtos from './PagosMixtos.jsx';
import ModalFactura from './Factura.jsx';
import {
	ArrowRightIcon,
	CashIcon2,
	ChevronDownIcon2,
	ChevronUpIcon,
	MinusIcon,
	PlusIcon,
	SearchIcon,
	TrashIcon,
} from '../../../components/Icons/Icons.jsx';
import DetalleFactura from '../admin/DetalleFactura.jsx';
import { getInputClasses } from '../../../helpers/estilosGlobales.jsx';

const PanelVentas = ({ usuarioId, cajaActual }) => {
	const [categoriaActiva, setCategoriaActiva] = useState('Todo');
	const [busqueda, setBusqueda] = useState('');
	const [carrito, setCarrito] = useState([]);
	const [showModalPago, setShowModalPago] = useState(false);
	const [showModalFactura, setShowModalFactura] = useState(false);
	const [facturaReciente, setFacturaReciente] = useState(null);

	const categorias = useSelector((state) => state.categorias.categorias);
	const productos = useSelector((state) => state.productos.productos);

	const idCaja = cajaActual._id ? cajaActual?._id : cajaActual[0]?._id;

	// Filtros

	const productosFiltrados = productos.filter((p) => {
		// 1. Obtenemos el ID de la categoría del producto de forma segura
		// Si p.categoria es un objeto (populado), tomamos ._id. Si es un string (ID plano), lo usamos directo.
		const categoriaProducto = p.categoria?.nombre || p.categoria;

		// 2. Comparamos IDs (o si está activa la opción 'Todo')
		const matchCat =
			categoriaActiva === 'Todo' || categoriaProducto === categoriaActiva;

		// 3. Filtro por nombre (búsqueda)
		const matchSearch = p.nombre.toLowerCase().includes(busqueda.toLowerCase());

		return matchCat && matchSearch;
	});

	// Estado para expandir/contraer el carrito
	const [expandirCarrito, setExpandirCarrito] = useState(false);

	// --- LÓGICA DEL CARRITO ---
	const agregarAlCarrito = (prod) => {
		setCarrito((prev) => {
			const existe = prev.find((item) => item._id === prod._id);
			if (existe)
				return prev.map((item) =>
					item._id === prod._id
						? { ...item, cantidad: item.cantidad + 1 }
						: item
				);
			return [...prev, { ...prod, cantidad: 1 }];
		});
	};

	const restarDelCarrito = (prodId) => {
		setCarrito((prev) => {
			const existente = prev.find((item) => item._id === prodId);
			if (existente?.cantidad === 1) {
				return prev.filter((item) => item._id !== prodId);
			}
			return prev.map((item) =>
				item._id === prodId ? { ...item, cantidad: item.cantidad - 1 } : item
			);
		});
	};

	const eliminarItemCarrito = (prodId) => {
		setCarrito((prev) => prev.filter((item) => item._id !== prodId));
	};

	const totalCarrito = carrito.reduce(
		(acc, item) => acc + item.precio * item.cantidad,
		0
	);
	const itemsTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

	const handleCloseModalFactura = () => {
		setShowModalFactura(false);
		setFacturaReciente(null);
	};

	return (
		<div className='flex flex-col h-full  relative'>
			{/* Buscador y Categorías */}
			<div className='p-3  backdrop-blur-md sticky top-0 z-10 border-b border-white shadow-md'>
				<div className='flex gap-2 items-center p-2 rounded-lg border border-white mb-2 h-10'>
					<SearchIcon className='text-gray-400 ml-1 w-4 h-4' />
					<input
						type='text'
						placeholder='Buscar producto...'
						className='bg-transparent w-full text-white text-sm outline-none placeholder-white'
						value={busqueda}
						onChange={(e) => setBusqueda(e.target.value)}
					/>
				</div>
				<div className='flex gap-2 overflow-x-auto pb-1 custom-scrollbar scroll-smooth'>
					<button
						type='button'
						className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border ${
							categoriaActiva === 'Todo'
								? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-900/30'
								: 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
						}`}
						onClick={() => setCategoriaActiva('Todo')}>
						Todas
					</button>
					{categorias.map((cat) => (
						<button
							type='button'
							key={cat._id}
							onClick={() => setCategoriaActiva(cat.nombre)}
							className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border ${
								categoriaActiva === cat.nombre
									? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-900/30'
									: 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
							}`}>
							{cat.nombre}
						</button>
					))}
				</div>
			</div>

			{/* Grid Productos */}
			<div className='flex-1 overflow-y-auto p-2 pb-24 grid grid-cols-2 gap-2 content-start'>
				{productosFiltrados.map((prod) => (
					<div
						key={prod._id}
						onClick={() => agregarAlCarrito(prod)}
						className=' rounded-xl p-2 border border-gray-700 flex flex-col justify-between active:scale-95 transition-transform touch-manipulation shadow-md relative overflow-hidden h-36'>
						{carrito.find((c) => c._id === prod._id)?.cantidad > 0 && (
							<div className='absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-bl-lg flex items-center justify-center text-white font-bold text-xs shadow-lg z-10'>
								{carrito.find((c) => c._id === prod._id).cantidad}
							</div>
						)}
						<div className='h-14 w-full bg-linear-to-br from-red-800 to-black rounded-lg mb-2 flex items-center justify-center text-xl shadow-inner pointer-events-none'>
							🍺
						</div>
						<div className='flex-1 min-h-0 flex flex-col justify-between pointer-events-none'>
							<div className='flex justify-between'>
								<div>
									<h4 className='font-bold text-white text-xs leading-tight line-clamp-2 mb-0.5'>
										{prod.nombre}
									</h4>
									<p className='text-red-400 font-black text-sm'>
										{formatearPesos(prod.precio)}
									</p>
								</div>
								<div
									className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center justify-end gap-1 ${
										prod.stock <= 0
											? 'bg-red-900/50 text-red-400 border border-red-800'
											: prod.stock <= 5
												? 'bg-orange-900/50 text-orange-400 border border-orange-800'
												: 'bg-green-900/50 text-green-400 border border-green-800'
									}`}>
									<span>Stock:</span>
									<span className='text-sm'>{prod.stock}</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* ========================================================= */}
			{/* COMPONENTE DE CARRITO EXPANDIBLE / CONTRAÍDO              */}
			{/* ========================================================= */}
			{carrito.length > 0 && (
				<>
					{/* BACKDROP CUANDO ESTÁ EXPANDIDO */}
					{expandirCarrito && (
						<div
							className='absolute inset-0  backdrop-blur-sm z-30 animate-fade-in'
							onClick={() => setExpandirCarrito(false)}
						/>
					)}

					<div
						className={`absolute bottom-0 left-0 w-full z-40 ${getInputClasses} border-t border-red-900/50 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out flex flex-col ${
							expandirCarrito
								? 'h-[93%] rounded-t-2xl' // 🚀 OPTIMIZACIÓN ANDROID: Usa el 93% de la altura
								: 'h-auto rounded-t-xl p-3 pb-4'
						}`}
						// Nota: getInputClasses ya trae bg-gray-900/50, asegurando la consistencia de estilos que pediste
					>
						{/* HEADER DEL CARRITO (EXPANDIDO) O BARRA RESUMEN (CONTRAÍDO) */}
						<div
							className='flex items-center justify-between cursor-pointer'
							onClick={() => setExpandirCarrito(!expandirCarrito)}>
							{expandirCarrito ? (
								// Header Expandido
								<div className='w-full flex items-center justify-between p-4 border-b border-gray-800'>
									<div className='flex items-center gap-2'>
										<div className='w-8 h-8 bg-red-900/30 rounded-full flex items-center justify-center text-red-500'>
											<CashIcon2 className='text-sm' />
										</div>
										<div>
											<h3 className='text-sm font-bold text-white'>
												Tu Pedido
											</h3>
											<p className='text-[10px] text-gray-400'>
												{itemsTotal} productos agregados
											</p>
										</div>
									</div>
									<button
										type='button'
										className='p-2 rounded-full bg-gray-800 text-gray-400'>
										<ChevronDownIcon2 className='w-5 h-5' />
									</button>
								</div>
							) : (
								// Barra Resumen (Contraído)
								<div className='w-full flex justify-between items-center px-1'>
									<div className='flex flex-col'>
										<div className='flex items-center gap-1.5'>
											<span className='text-[10px] text-gray-400 font-bold uppercase'>
												Total a Pagar
											</span>
											<ChevronUpIcon className='w-3 h-3 text-red-500 animate-bounce' />
										</div>
										<div className='flex items-baseline gap-1'>
											<span className='text-xl font-black text-white'>
												{formatearPesos(totalCarrito)}
											</span>
											<span className='text-xs text-gray-400'>
												({itemsTotal} items)
											</span>
										</div>
									</div>
									{/* Botón Cobrar Rápido */}
									<button
										type='button'
										onClick={(e) => {
											e.stopPropagation(); // Evitar expandir al dar click en cobrar
											setShowModalPago(true);
										}}
										className='bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-900/50 active:scale-95 transition-transform'>
										COBRAR
									</button>
								</div>
							)}
						</div>

						{/* LISTA DETALLADA (SOLO VISIBLE CUANDO EXPANDIDO) */}
						{expandirCarrito && (
							<div className='flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3'>
								{carrito.map((item) => (
									<div
										key={item._id}
										className='flex items-center justify-between p-3 rounded-xl border border-gray-700/50 bg-gray-800/40'>
										<div className='flex items-center gap-3'>
											{/* Miniatura o Icono */}
											<div className='w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-lg'>
												🍺
											</div>
											<div>
												<h4 className='text-xs font-bold text-white leading-tight'>
													{item.nombre}
												</h4>
												<p className='text-xs text-red-400 font-bold'>
													{formatearPesos(item.precio)}{' '}
													<span className='text-gray-500 font-normal'>c/u</span>
												</p>
											</div>
										</div>
										<div className='flex space-x-2'>
											<div className='flex flex-col items-center gap-3'>
												{/* Controles de Cantidad */}
												<div className='flex items-center bg-gray-900 rounded-lg border border-gray-700'>
													<button
														type='button'
														onClick={() => restarDelCarrito(item._id)}
														className='w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white active:bg-gray-800 rounded-l-lg'>
														{item.cantidad === 1 ? (
															<TrashIcon className='w-3 h-3 text-red-500' />
														) : (
															<MinusIcon className='w-3 h-3' />
														)}
													</button>
													<span className='w-6 text-center text-sm font-bold text-white'>
														{item.cantidad}
													</span>
													<button
														type='button'
														onClick={() => agregarAlCarrito(item)}
														className='w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white active:bg-gray-800 rounded-r-lg'>
														<PlusIcon className='w-3 h-3' />
													</button>
												</div>
												{/* Subtotal Item */}
												<div className='text-right w-16'>
													<p className='text-sm font-bold text-white'>
														{formatearPesos(item.precio * item.cantidad)}
													</p>
												</div>
											</div>
										</div>
										{/* BOTÓN DE ELIMINAR (Integrado) */}
										<button
											type='button'
											onClick={() => eliminarItemCarrito(item._id)}
											className='w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-gray-700 rounded-lg transition-all'
											title='Eliminar producto'>
											<TrashIcon className='w-4 h-4' />
										</button>
									</div>
								))}
							</div>
						)}

						{/* FOOTER DEL CARRITO EXPANDIDO */}
						{expandirCarrito && (
							<div className='p-4 border-t border-gray-800 '>
								<div className='flex justify-between items-center mb-4'>
									<span className='text-gray-400 uppercase text-xs font-bold'>
										Total Final
									</span>
									<span className='text-2xl font-black text-white'>
										{formatearPesos(totalCarrito)}
									</span>
								</div>
								<button
									type='button'
									onClick={() => setShowModalPago(true)}
									className='w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-900/40 active:scale-95 transition-transform flex items-center justify-center gap-2'>
									<span>IR A PAGAR</span>
									<ArrowRightIcon className='w-5 h-5' />
								</button>
							</div>
						)}
					</div>
				</>
			)}

			{/* MODALES DEL FLUJO DE PAGO */}
			{showModalPago && (
				<ModalPagosMixtos
					total={totalCarrito}
					carrito={carrito} // Pasamos el carrito para armar los productos
					setCarrito={setCarrito}
					usuarioId={usuarioId} // Pasamos el ID del usuario
					cajaId={idCaja} // Pasamos el ID de la caja
					onClose={() => setShowModalPago(false)}
					setFacturaReciente={setFacturaReciente}
					showModalFactura={setShowModalFactura}
				/>
			)}

			{showModalFactura && (
				<div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in bg-black/50'>
					<DetalleFactura
						factura={facturaReciente[0]}
						onClose={handleCloseModalFactura}
					/>
				</div>
			)}
		</div>
	);
};
export default PanelVentas;
