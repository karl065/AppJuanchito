import { useDispatch, useSelector } from 'react-redux';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import { useEffect, useMemo, useState } from 'react';
import { usePaginacionResponsiva } from '../../../Hooks/usePaginacionResponsiva.jsx';
import Filtros from '../../../components/CabeceraFiltros/Filtros.jsx';
import MobileTable from '../../../components/MobileTable/MobileTable.jsx';
import Paginado from '../../../components/Paginado/Paginado.jsx';
import { mapMultiOpciones } from '../../../helpers/mapMultiOpciones.jsx';
import { filtersConfigs } from '../../../helpers/filtersConfig.jsx';
import { alertSuccess, alertWarning } from '../../../helpers/alertas.jsx';
import { XIcon } from '../../../components/Icons/Icons.jsx';
import FormularioCrearProducto from '../../formularios/generales/productos/CrearProducto.jsx';
import FormularioActualizarProducto from '../../formularios/generales/productos/ActualizarProductos.jsx';
import { eliminarProductosAction } from '../../../redux/productos/actions/eliminarProductosAction.jsx';

const Inventario = () => {
	const dispatch = useDispatch();
	const productos = useSelector((state) => state.productos.productos);
	const categorias = useSelector((state) => state.categorias.categorias);

	const [busqueda, setBusqueda] = useState('');

	const [isModalCrearProductoOpen, setIsModalCrearProductoOpen] =
		useState(false);
	const [isModalActualizarProductoOpen, setIsModalActualizarProductoOpen] =
		useState(false);

	// Estado para guardar el producto que se va a editar
	const [productoEditar, setProductoEditar] = useState(null);

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
	const handleEdit = (producto) => {
		setProductoEditar(producto);
		setIsModalActualizarProductoOpen(true);
	};
	const handleDelete = async (row) => {
		const resp = await alertWarning('Esta seguro de eliminar este producto?');

		if (resp) eliminarProductosAction(dispatch, row.id);
	};

	// 🚨 2. HANDLER PARA ABRIR MODAL
	const handleAddProduct = () => {
		setIsModalCrearProductoOpen(true);
	};

	// 🚨 3. HANDLERS PARA CERRAR Y ÉXITO
	const handleCloseCrearProductoModal = () =>
		setIsModalCrearProductoOpen(false);

	const handleCloseActualizar = () => {
		setIsModalActualizarProductoOpen(false);
		setProductoEditar(null);
	};

	const handleSuccessCreate = (nuevoProducto) => {
		alertSuccess(`Producto "${nuevoProducto.nombre}" creado con éxito.`);
		setIsModalCrearProductoOpen(false);
	};

	const handleSuccessUpdate = (productoActualizado) => {
		alertSuccess(`Producto "${productoActualizado.nombre}" actualizado.`);
		handleCloseActualizar();
	};

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
		<div className="flex flex-col h-full  gap-3 p-2 ">
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
						onEdit={(row) => {
							// Encontramos el usuario original basado en el ID
							const producto = productos.find((u) => u._id === row.id);
							handleEdit(producto);
						}}
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

			{/* 🚨 4. MODAL INTEGRADO */}
			{isModalCrearProductoOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in">
					<div className="bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] w-full max-w-md rounded-xl border border-gray-700 shadow-2xl animate-fade-in-up relative">
						<div className="flex justify-between items-center p-4 border-b border-gray-700">
							<h3 className="text-lg font-bold text-white">Nuevo Producto</h3>
							<button
								onClick={handleCloseCrearProductoModal}
								className="p-1 rounded-full hover:bg-gray-700 transition-colors">
								<XIcon className="w-5 h-5 text-gray-400 hover:text-white" />
							</button>
						</div>

						<div className="p-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
							<FormularioCrearProducto
								onSuccess={handleSuccessCreate}
								onClose={handleCloseCrearProductoModal}
							/>
						</div>
					</div>
				</div>
			)}

			{/* MODAL ACTUALIZAR */}
			{isModalActualizarProductoOpen && productoEditar && (
				<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in">
					<div className="bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] w-full max-w-md rounded-xl border border-gray-700 shadow-2xl animate-fade-in-up relative">
						<div className="flex justify-between items-center p-4 border-b border-gray-700">
							<h3 className="text-lg font-bold text-white">
								Actualizar Producto
							</h3>
							<button
								onClick={handleCloseActualizar}
								className="p-1 rounded-full hover:bg-gray-700 transition-colors">
								<XIcon className="w-5 h-5 text-gray-400 hover:text-white" />
							</button>
						</div>
						<div className="p-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
							<FormularioActualizarProducto
								productoAEditar={productoEditar}
								onSuccess={handleSuccessUpdate}
								onClose={handleCloseActualizar}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Inventario;
