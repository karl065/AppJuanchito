import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePaginacionResponsiva } from '../../../Hooks/usePaginacionResponsiva.jsx';
import {
	ArrowDownIcon,
	ArrowUpIcon,
} from '../../../components/Icons/Icons.jsx';
import { formatearFechaHora } from '../../../helpers/formatearFechaHora.jsx';
import { formatearLabel } from '../../../helpers/formatearLabel.jsx';
import Filtros from '../../../components/CabeceraFiltros/Filtros.jsx';
import MobileTable from '../../../components/MobileTable/MobileTable.jsx';
import Paginado from '../../../components/Paginado/Paginado.jsx';
import DetalleMovimiento from './DetalleMovimientos.jsx';
import FormularioCrearMovimientos from '../../formularios/generales/productos/CrearMovimientos.jsx';

const Movimientos = () => {
	const movimientos = useSelector((state) => state.movimientos.movimientos);
	const tipoMovimientos = useSelector(
		(state) => state.movimientos.tiposMovimiento
	);

	const [busqueda, setBusqueda] = useState('');
	const tableContainerRef = useRef(null);

	// 🚨 NUEVO ESTADO: Para controlar el modal de detalle
	const [movimientoSeleccionado, setMovimientoSeleccionado] = useState(null);

	const [isFormModalOpen, setIsFormModalOpen] = useState(false);

	// --- Filtrado ---
	const movimientosFiltrados = useMemo(() => {
		if (!movimientos) return [];
		return movimientos.filter((mov) => {
			const term = busqueda.toLowerCase().trim();
			const coincide =
				!term ||
				mov.descripcion.toLowerCase().includes(term) ||
				mov.producto?.nombre.toLowerCase().includes(term) ||
				mov.usuario?.nombre.toLowerCase().includes(term) ||
				mov.tipo.toLowerCase().includes(term);
			return coincide;
		});
	}, [movimientos, busqueda]);

	// --- Paginación ---
	const {
		paginatedData,
		currentPage,
		totalPages,
		goToPrevPage,
		goToNextPage,
		resetPage,
	} = usePaginacionResponsiva(movimientosFiltrados, tableContainerRef, 80);

	useEffect(() => {
		resetPage();
	}, [busqueda, resetPage]);

	// 🚨 MODIFICADO: Abre el modal y pasa el objeto completo
	const handleViewDetail = (row) => {
		setMovimientoSeleccionado(row.originalData);
	};

	const handleCloseDetail = () => {
		setMovimientoSeleccionado(null);
	};

	// 🚨 MODIFICADO: Abre el modal del formulario
	const handleAddMovement = () => {
		setIsFormModalOpen(true);
	};

	// --- Columnas ---
	const columns = [
		{
			key: 'producto',
			label: 'Producto y Detalle',
			className: 'text-left w-auto',
		},
		{ key: 'movimiento', label: 'Tipo y Cant.', className: 'text-right w-36' },
	];

	// --- Mapeo de Datos con Lógica de Tipos ---
	const tableData = paginatedData.map((mov) => {
		// Lógica de Dirección (Salida vs Entrada)

		const isSalida = tipoMovimientos?.includes(mov.tipo);

		// Cantidad a mostrar
		const cantidad = isSalida ? mov.salida || 0 : mov.entrada || 0;

		// Configuración visual según tipo
		let typeColor = 'text-gray-400';
		let badgeColor = 'bg-gray-800 text-gray-400 border-gray-600';
		let TypeIcon = isSalida ? ArrowUpIcon : ArrowDownIcon;

		switch (mov.tipo) {
			case 'venta':
				typeColor = 'text-green-500';
				badgeColor = 'bg-green-200/20 text-red-300 border-green-200/50';
				break;
			case 'entrada':
				typeColor = 'text-green-500';
				badgeColor = 'bg-green-900/20 text-green-300 border-green-500/50';
				break;
			case 'cortesía':
				typeColor = 'text-pink-400';
				badgeColor = 'bg-pink-900/20 text-pink-300 border-pink-500/50';
				break;
			case 'préstamo_salida':
				typeColor = 'text-orange-400';
				badgeColor = 'bg-orange-900/20 text-orange-300 border-orange-500/50';
				break;
			case 'préstamo_entrada':
				typeColor = 'text-teal-400';
				badgeColor = 'bg-teal-900/20 text-teal-300 border-teal-500/50';
				break;
			case 'devolución_entrada':
				typeColor = 'text-blue-400';
				badgeColor = 'bg-blue-900/20 text-blue-300 border-blue-500/50';
				break;
			case 'devolución_salida':
				typeColor = 'text-gray-400';
				badgeColor = 'bg-gray-800 text-gray-300 border-gray-500';
				break;
			default:
				break;
		}

		return {
			id: mov._id,
			originalData: mov,
			producto: (
				<div className="flex flex-col text-left">
					<span className="text-sm font-bold text-white uppercase tracking-tight">
						{mov.producto?.nombre || 'Producto Eliminado'}
					</span>
					<span className="text-[10px] text-gray-400 italic mb-0.5 line-clamp-1">
						{mov.descripcion}
					</span>
					<div className="flex items-center gap-2 mt-1">
						<span className="text-[9px] text-white font-mono  px-1.5 py-0.5 rounded">
							{formatearFechaHora(mov.createdAt)}
						</span>
						<span className="text-[9px] text-blue-300">
							{mov.usuario?.nombre ? mov.usuario.nombre.split(' ')[0] : 'N/A'}
						</span>
					</div>
				</div>
			),
			movimiento: (
				<div className="flex flex-col items-end justify-center h-full">
					{/* Cantidad y Flecha */}
					<div
						className={`flex items-center gap-1 font-bold text-base ${typeColor} mb-1`}>
						<span>{cantidad}</span>
						<TypeIcon className="w-3 h-3" strokeWidth={3} />
					</div>

					{/* Badge de Tipo */}
					<span
						className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border border-opacity-40 whitespace-nowrap ${badgeColor}`}>
						{formatearLabel(mov.tipo)}
					</span>
				</div>
			),
		};
	});

	const handleAddUser = handleAddMovement;

	return (
		<div className="flex flex-col h-full gap-3 p-2">
			<Filtros
				busqueda={busqueda}
				setBusqueda={setBusqueda}
				onAdd={handleAddUser}
				placeholder="Buscar producto, tipo o usuario..."
				addButtonTitle="Nuevo Movimiento"
			/>

			<div className="flex-1 min-h-0 relative" ref={tableContainerRef}>
				{tableData.length > 0 ? (
					<MobileTable
						columns={columns}
						data={tableData}
						onViewDetail={handleViewDetail}
					/>
				) : (
					<div className="text-center text-gray-500 text-sm mt-8">
						No se encontraron movimientos.
					</div>
				)}
			</div>

			<Paginado
				currentPage={currentPage}
				totalPages={totalPages}
				goToPrevPage={goToPrevPage}
				goToNextPage={goToNextPage}
			/>
			{/* 🚨 MODAL DE DETALLE DE MOVIMIENTO */}
			{movimientoSeleccionado && (
				<DetalleMovimiento
					movimiento={movimientoSeleccionado}
					onClose={handleCloseDetail}
				/>
			)}
			{/* 🚨 MODAL DE NUEVO MOVIMIENTO */}
			{isFormModalOpen && (
				<FormularioCrearMovimientos onClose={() => setIsFormModalOpen(false)} />
			)}
		</div>
	);
};

export default Movimientos;
