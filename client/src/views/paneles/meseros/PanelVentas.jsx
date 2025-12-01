import { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import ModalPagosMixtos from './PagosMixtos.jsx';
import ModalFactura from './Factura.jsx';
import { SearchIcon } from '../../../components/Icons/Icons.jsx';

const PanelVentas = ({ onRealizarVenta }) => {
	const [categoriaActiva, setCategoriaActiva] = useState('Todo');
	const [busqueda, setBusqueda] = useState('');
	const [carrito, setCarrito] = useState([]);

	const categorias = useSelector((state) => state.categorias.categorias);
	const productos = useSelector((state) => state.productos.productos);

	// Estados para el flujo de cobro
	const [stepCobro, setStepCobro] = useState(null); // null | 'pago' | 'factura'
	const [datosPago, setDatosPago] = useState(null); // Se llena en el paso 1

	// Filtros
	const productosFiltrados = productos.filter((p) => {
		const matchCat =
			categoriaActiva === 'Todo' || p.categoria === categoriaActiva;
		const matchSearch = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
		return matchCat && matchSearch;
	});

	const agregarAlCarrito = (prod) => {
		setCarrito((prev) => {
			const existe = prev.find((item) => item._id === prod._id);
			if (existe) {
				return prev.map((item) =>
					item._id === prod._id
						? { ...item, cantidad: item.cantidad + 1 }
						: item
				);
			}
			return [...prev, { ...prod, cantidad: 1 }];
		});
	};

	// const eliminarDelCarrito = (id) => {
	// 	setCarrito((prev) => prev.filter((item) => item._id !== id));
	// };

	const totalCarrito = carrito.reduce(
		(acc, item) => acc + item.precio * item.cantidad,
		0
	);
	const itemsTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

	return (
		<div className="flex flex-col h-full  relative">
			{/* Buscador y Categorías */}
			<div className="p-3 bg-gray-900/95 backdrop-blur-md sticky top-0 z-10 border-b border-gray-800 shadow-md">
				<div className="flex gap-2 items-center bg-gray-800 p-2 rounded-lg border border-gray-700 mb-2 h-10">
					<SearchIcon className="text-gray-400 ml-1 w-4 h-4" />
					<input
						type="text"
						placeholder="Buscar producto..."
						className="bg-transparent w-full text-white text-sm outline-none placeholder-gray-500"
						value={busqueda}
						onChange={(e) => setBusqueda(e.target.value)}
					/>
				</div>
				<div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar scroll-smooth">
					{categorias.map((cat) => (
						<button
							key={cat._id}
							onClick={() => setCategoriaActiva(cat.nombre)}
							className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border ${
								categoriaActiva === cat.nombre
									? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-900/30'
									: 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700'
							}`}>
							{cat.nombre}
						</button>
					))}
				</div>
			</div>

			{/* Grid Productos */}
			<div className="flex-1 overflow-y-auto p-2 pb-24 grid grid-cols-2 gap-2 content-start">
				{productosFiltrados.map((prod) => (
					<div
						key={prod._id}
						onClick={() => agregarAlCarrito(prod)}
						className="bg-gray-800 rounded-xl p-2 border border-gray-700 flex flex-col justify-between active:scale-95 transition-transform touch-manipulation shadow-md relative overflow-hidden h-36">
						{carrito.find((c) => c._id === prod._id)?.cantidad > 0 && (
							<div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-bl-lg flex items-center justify-center text-white font-bold text-xs shadow-lg z-10">
								{carrito.find((c) => c._id === prod._id).cantidad}
							</div>
						)}
						<div className="h-14 w-full bg-linear-to-br from-gray-700 to-gray-800 rounded-lg mb-2 flex items-center justify-center text-xl shadow-inner pointer-events-none">
							🍺
						</div>
						<div className="flex-1 min-h-0 flex flex-col justify-between pointer-events-none">
							<div>
								<h4 className="font-bold text-white text-xs leading-tight line-clamp-2 mb-0.5">
									{prod.nombre}
								</h4>
								<p className="text-red-400 font-black text-sm">
									{formatearPesos(prod.precio)}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Barra Inferior */}
			{carrito.length > 0 && (
				<div className="absolute bottom-4 left-4 right-4 bg-gray-800/90 backdrop-blur-md border border-red-500/50 rounded-2xl p-3 shadow-2xl animate-fade-in z-20 flex justify-between items-center">
					<div className="flex flex-col">
						<span className="text-[10px] text-gray-400 font-bold uppercase">
							Total a Cobrar
						</span>
						<div className="flex items-baseline gap-1">
							<span className="text-xl font-black text-white">
								{formatearPesos(totalCarrito)}
							</span>
							<span className="text-xs text-gray-400">
								({itemsTotal} items)
							</span>
						</div>
					</div>
					<button
						onClick={() => setStepCobro('pago')}
						className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-900/50 active:scale-95 transition-transform">
						COBRAR
					</button>
				</div>
			)}

			{/* MODALES DEL FLUJO DE PAGO */}
			{stepCobro === 'pago' && (
				<ModalPagosMixtos
					total={totalCarrito}
					onClose={() => setStepCobro(null)}
					onNext={(datos) => {
						setDatosPago(datos);
						setStepCobro('factura');
					}}
				/>
			)}

			{stepCobro === 'factura' && datosPago && (
				<ModalFactura
					carrito={carrito}
					datosPago={datosPago}
					total={totalCarrito}
					onBack={() => setStepCobro('pago')}
					onConfirm={(imprimir) => {
						onRealizarVenta({
							carrito,
							total: totalCarrito,
							...datosPago, // contiene metodos, cambio, mesa, etc.
							imprimirFactura: imprimir,
						});
						setCarrito([]);
						setStepCobro(null);
						setDatosPago(null);
					}}
				/>
			)}
		</div>
	);
};
export default PanelVentas;
