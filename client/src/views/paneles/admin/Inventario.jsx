import { useSelector } from 'react-redux';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import { useEffect, useMemo, useState } from 'react';
import { usePaginacionResponsiva } from '../../../Hooks/usePaginacionResponsiva.jsx';
import Filtros from '../../../components/CabeceraFiltros/Filtros.jsx';
import MobileTable from '../../../components/MobileTable/MobileTable.jsx';
import Paginado from '../../../components/Paginado/Paginado.jsx';
import DropdownFiltro from '../../../components/DropdownFiltro/DropdownFiltro.jsx';
import DropdownControl from '../../../components/DropdownControl/DropdownControl.jsx';
import { mapMultiOpciones } from '../../../helpers/mapMultiOpciones.jsx';
import { filtersConfigs } from '../../../helpers/filtersConfig.jsx';

const Inventario = () => {
	const productos = useSelector((state) => state.productos.productos);
	const categorias = useSelector((state) => state.categorias.categorias);

	const [busqueda, setBusqueda] = useState('');

	// 1. Filtrado Específico de Productos
	const productosFiltrados = useMemo(() => {
		if (!productos) return [];
		const lowerCaseBusqueda = busqueda.toLowerCase();
		return productos.filter(
			(prod) =>
				prod.nombre.toLowerCase().includes(lowerCaseBusqueda) ||
				prod.categoria?.nombre.toLowerCase().includes(lowerCaseBusqueda)
		);
	}, [productos, busqueda]);

	// 2. Uso del Hook de Paginación
	const {
		paginatedData,
		currentPage,
		totalPages,
		goToPrevPage,
		goToNextPage,
		resetPage,
	} = usePaginacionResponsiva(productosFiltrados);

	// Resetear página al buscar
	useEffect(() => {
		resetPage();
	}, [busqueda, resetPage]);

	const estadosOpciones = [
		{
			estadoRedux: categorias,
			key: '_id',
			label: 'nombre',
			value: 'nombre',
			nombre: 'Categorias',
		},
	];

	const filtrosOpciones = mapMultiOpciones(estadosOpciones);

	const filtersConfig = filtersConfigs(filtrosOpciones, busqueda, setBusqueda);

	// Handlers
	const handleEdit = (row) => console.log('Editar Producto', row.id);
	const handleDelete = (row) => console.log('Borrar Producto', row.id);
	const handleAddProduct = () => console.log('Crear producto');

	// 3. Configuración de la Tabla (Mapeo de Datos)
	const tableData = paginatedData.map((prod) => ({
		id: prod._id,
		info: (
			<div className="flex flex-col text-left max-w-[140px] sm:max-w-full">
				<span className="font-bold text-white uppercase text-xs wrap-break-word leading-tight">
					{prod.nombre}
				</span>
				<div className="flex flex-wrap gap-1 mt-1">
					<span className="text-[10px] text-gray-400 px-1 border border-gray-600 rounded">
						{prod.unidadMedida}
					</span>
					<span className="text-[10px] text-gray-500 italic truncate max-w-20">
						{prod.categoria?.nombre}
					</span>
				</div>
			</div>
		),
		estado: (
			<div className="flex flex-col items-end gap-1">
				<span className="font-bold text-yellow-400 text-xs whitespace-nowrap">
					{formatearPesos(prod.precio)}
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

	const columns = [
		{ key: 'info', label: 'Producto' },
		{ key: 'estado', label: 'Estado' },
	];

	return (
		<div className="flex flex-col h-full min-h-screen gap-3 p-2 ">
			{/* Cabecera de Filtros Reutilizable */}
			<Filtros
				busqueda={busqueda}
				setBusqueda={setBusqueda}
				onAdd={handleAddProduct}
				placeholder="Buscar producto o categoría..."
				addButtonTitle="Crear nuevo producto"
				extraControls={filtersConfig}
			/>

			{/* Tabla con scroll Reutilizable */}
			<div className="flex-1 min-h-0 overflow-y-auto pb-4">
				{tableData.length > 0 ? (
					<MobileTable
						columns={columns}
						data={tableData}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				) : (
					<div className="text-center text-gray-500 text-sm mt-8">
						{productos?.length === 0 ? 'No hay productos.' : 'Sin resultados.'}
					</div>
				)}
			</div>

			{/* Controles de Paginación Reutilizable */}
			<Paginado
				currentPage={currentPage}
				totalPages={totalPages}
				goToPrevPage={goToPrevPage}
				goToNextPage={goToNextPage}
			/>
		</div>
	);
};

export default Inventario;
