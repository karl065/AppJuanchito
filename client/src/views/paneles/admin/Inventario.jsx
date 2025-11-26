/* eslint-disable react-hooks/set-state-in-render */
import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MobileTable from '../../../components/MobileTable/MobileTable.jsx'; // Ajusta la ruta según tu estructura
// --- Iconos SVG para la Vista Inventario ---

// Icono SVG para Búsqueda (HiSearch)
const SearchIcon = (props) => (
	<svg
		{...props}
		className="h-5 w-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
		/>
	</svg>
);

// Icono SVG para Añadir (HiPlus)
const PlusIcon = (props) => (
	<svg
		{...props}
		className="h-5 w-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 4v16m8-8H4"
		/>
	</svg>
);

// Icono SVG para Flecha Izquierda (HiChevronLeft)
const ChevronLeftIcon = (props) => (
	<svg
		{...props}
		className="h-5 w-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M15 19l-7-7 7-7"
		/>
	</svg>
);

// Icono SVG para Flecha Derecha (HiChevronRight)
const ChevronRightIcon = (props) => (
	<svg
		{...props}
		className="h-5 w-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9 5l7 7-7 7"
		/>
	</svg>
);

// 1. Helper para formatear dinero (COP)
const formatCurrency = (value) => {
	return new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(value);
};

// Lógica para determinar la cantidad de ítems por página según el tamaño de la ventana
const getItemsPerPage = (width) => {
	if (width >= 1024) {
		// Pantallas grandes (Desktop/lg)
		return 6;
	} else if (width >= 640) {
		// Pantallas medianas (Tablet/sm)
		return 5;
	}
	return 5; // Pantallas pequeñas (Móvil)
};

const Inventario = () => {
	const productos = useSelector((state) => state.productos.productos); // Asegúrate que este sea tu slice correcto

	const [busqueda, setBusqueda] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(
		getItemsPerPage(window.innerWidth)
	);

	// 1. Manejo Responsivo de Ítems por Página
	useEffect(() => {
		const handleResize = () => {
			const newItemsPerPage = getItemsPerPage(window.innerWidth);
			setItemsPerPage((prev) => {
				if (prev !== newItemsPerPage) {
					// Si el tamaño cambia, volvemos a la página 1
					setCurrentPage(1);
					return newItemsPerPage;
				}
				return prev;
			});
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// 2. Filtrado de productos y reseteo de página al buscar
	const productosFiltrados = useMemo(() => {
		if (!productos) return [];
		const lowerCaseBusqueda = busqueda.toLowerCase();
		const filtered = productos.filter(
			(prod) =>
				prod.nombre.toLowerCase().includes(lowerCaseBusqueda) ||
				prod.categoria?.nombre.toLowerCase().includes(lowerCaseBusqueda)
		);
		// Si la búsqueda cambia, reseteamos la página a 1
		setCurrentPage(1);
		return filtered;
	}, [productos, busqueda]);

	// 3. Cálculo de Paginación
	const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);

	const paginatedData = useMemo(() => {
		// Aseguramos que la página actual sea válida después de un cambio de filtro o resize
		if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(totalPages);
		}

		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return productosFiltrados.slice(startIndex, endIndex);
	}, [productosFiltrados, currentPage, itemsPerPage, totalPages]);

	// PREPARACIÓN DE DATOS COMPACTOS PARA EL MobileTable
	const tableData = paginatedData.map((prod) => ({
		id: prod._id,

		// COLUMNA 1 (KEY: info): INFO PRINCIPAL (Nombre + Detalles pequeños)
		info: (
			<div className="flex flex-col text-left max-w-[140px] sm:max-w-full">
				<span className="font-bold text-white uppercase text-xs wrap-break-word leading-tight">
					{prod.nombre}
				</span>
				<div className="flex flex-wrap gap-1 mt-1">
					<span className="text-[10px] text-gray-400 px-1 border border-white rounded">
						{prod.unidadMedida}
					</span>
					<span className="text-[10px] text-gray-500 italic truncate max-w-20">
						{prod.categoria?.nombre}
					</span>
				</div>
			</div>
		),

		// COLUMNA 2 (KEY: estado): ESTADO (Precio + Stock fusionados)
		estado: (
			<div className="flex flex-col items-end gap-1">
				<span className="font-bold text-yellow-400 text-xs whitespace-nowrap">
					{formatCurrency(prod.precio)}
				</span>
				<div
					className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center justify-end gap-1 ${
						prod.stock <= 0
							? 'bg-red-900/50 text-red-400 border border-red-800'
							: prod.stock <= 5
							? 'bg-orange-900/50 text-orange-400 border border-orange-800'
							: 'bg-green-900/50 text-green-400 border border-green-800'
					}`}>
					<span>Stock:</span>
					<span className="text-sm">{prod.stock}</span>
				</div>
			</div>
		),
	}));

	// Definición de columnas para el MobileTable
	const columns = [
		{ key: 'info', label: 'Producto' },
		{ key: 'estado', label: 'Estado' },
	];

	const handleEdit = (row) => console.log('Editar', row.id);
	const handleDelete = (row) => console.log('Borrar', row.id);
	const handleAddProduct = () => console.log('Crear producto');

	const goToPrevPage = () => {
		setCurrentPage((prev) => Math.max(1, prev - 1));
	};

	const goToNextPage = () => {
		setCurrentPage((prev) => Math.min(totalPages, prev + 1));
	};

	return (
		// Contenedor principal: h-full y min-h-screen para asegurar altura completa y flex-col
		<div className="flex flex-col h-full min-h-screen gap-3 p-2">
			{/* BARRA SUPERIOR (Fija en la parte superior) */}
			<div className="flex gap-2 items-center sticky top-0 z-10 backdrop-blur-sm py-2 border-b border-white">
				{/* 1. INPUT DE BÚSQUEDA */}
				<div className="flex-1 relative">
					<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none">
						<SearchIcon className="h-4 w-4" />
					</div>
					<input
						id="search-product"
						type="text"
						placeholder="Buscar producto o categoría..."
						value={busqueda}
						onChange={(e) => setBusqueda(e.target.value)}
						className="w-full pl-10 pr-4 py-2 text-xs h-9  border border-white text-white rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-500 transition-colors"
					/>
				</div>

				{/* 2. BOTÓN AÑADIR */}
				<button
					className="flex items-center justify-center h-9 w-9 rounded-lg bg-red-700 hover:bg-red-600 transition-colors active:scale-95 shadow-md shadow-red-900/50 shrink-0"
					onClick={handleAddProduct}
					title="Crear nuevo producto">
					<PlusIcon className="h-5 w-5 text-white" />
				</button>
			</div>

			{/* LISTA DE PRODUCTOS (El área que se desplaza) */}
			{/* CLAVE: Añadir overflow-y-auto para forzar el scroll interno */}
			<div className="flex-1 min-h-0 overflow-y-auto pb-4">
				<MobileTable
					columns={columns}
					data={tableData}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			</div>

			{/* CONTROLES DE PAGINACIÓN (Fijos en la parte inferior si hay más de una página) */}
			{productosFiltrados.length > itemsPerPage && (
				<div className="sticky bottom-0 z-10 flex justify-between w-50 sm:w-auto items-center px-4 py-2 rounded-lg text-white text-xs shadow-lg border border-white mt-auto">
					<button
						onClick={goToPrevPage}
						disabled={currentPage === 1}
						className={`flex items-center px-3 py-1 rounded-full transition-all ${
							currentPage === 1
								? 'text-white  cursor-not-allowed'
								: 'bg-red-700 hover:bg-red-600 active:scale-95'
						}`}
						title="Página anterior">
						<ChevronLeftIcon className="h-4 w-4" />
						<span className="ml-1 hidden sm:inline">Anterior</span>
					</button>

					<span className="font-semibold text-white">
						Página {currentPage} de {totalPages}
					</span>

					<button
						onClick={goToNextPage}
						disabled={currentPage === totalPages}
						className={`flex items-center px-3 py-1 rounded-full transition-all ${
							currentPage === totalPages
								? 'text-white  cursor-not-allowed'
								: 'bg-red-700 hover:bg-red-600 active:scale-95'
						}`}
						title="Página siguiente">
						<span className="mr-1 hidden sm:inline">Siguiente</span>
						<ChevronRightIcon className="h-4 w-4" />
					</button>
				</div>
			)}

			{productosFiltrados.length === 0 && (
				<div className="text-center text-white text-sm mt-8">
					Sin resultados
				</div>
			)}
		</div>
	);
};
export default Inventario;
