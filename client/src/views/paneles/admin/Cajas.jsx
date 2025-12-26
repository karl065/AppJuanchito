import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePaginacionResponsiva } from '../../../Hooks/usePaginacionResponsiva.jsx';
import { formatearFechaHora } from '../../../helpers/formatearFechaHora.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import { CashIcon, CheckCircleIcon } from '../../../components/Icons/Icons.jsx';
import MobileTable from '../../../components/MobileTable/MobileTable.jsx';
import Paginado from '../../../components/Paginado/Paginado.jsx';
import Filtros from '../../../components/CabeceraFiltros/Filtros.jsx';
import DetalleCaja from './DetalleCaja.jsx';

const Cajas = () => {
	const cajas = useSelector((state) => state.cajas.cajas);
	const [busqueda, setBusqueda] = useState('');
	const tableContainerRef = useRef(null);

	console.log(cajas);

	// 🚨 ESTADO PARA MOSTRAR EL DETALLE
	const [cajaSeleccionada, setCajaSeleccionada] = useState(null);

	// --- Lógica de Filtrado ---
	const cajasFiltradas = useMemo(() => {
		if (!cajas) return [];
		return cajas.filter((caja) => {
			const term = busqueda.toLowerCase().trim();
			const coincide =
				!term ||
				caja._id.toLowerCase().includes(term) ||
				caja.usuario?.nombre.toLowerCase().includes(term) ||
				caja.estado.toLowerCase().includes(term);
			return coincide;
		});
	}, [cajas, busqueda]);

	// --- Paginación Responsiva ---
	const {
		paginatedData,
		currentPage,
		totalPages,
		goToPrevPage,
		goToNextPage,
		resetPage,
	} = usePaginacionResponsiva(cajasFiltradas, tableContainerRef, 100);

	useEffect(() => {
		resetPage();
	}, [busqueda, resetPage]);

	// --- Handlers ---
	const handleViewDetail = (row) => {
		setCajaSeleccionada(row.originalData);
	};

	const handleCloseDetail = () => {
		setCajaSeleccionada(null);
	};

	// --- Configuración de Columnas ---
	const columns = [
		{ key: 'info', label: 'Caja y Responsable', className: 'text-left w-auto' },
		{
			key: 'balance',
			label: 'Balance y Totales',
			className: 'text-right w-40',
		},
	];

	// --- Mapeo de Datos ---
	const tableData = paginatedData.map((caja) => {
		const isOpen = caja.estado === 'abierta';

		return {
			id: caja._id,
			originalData: caja,
			info: (
				<div className='flex flex-col text-left'>
					<div className='flex items-center gap-2 mb-1'>
						<span
							className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
								isOpen
									? 'bg-green-900/30 text-green-400 border-green-800'
									: 'bg-gray-800 text-gray-400 border-gray-600'
							}`}>
							{caja.estado}
						</span>
						<span className='text-[10px] text-gray-500 font-mono'>
							{caja._id.substring(0, 6)}...
						</span>
					</div>

					<span className='text-xs font-bold text-white mb-0.5'>
						{caja.usuario?.nombre || 'Desconocido'}
					</span>

					<span className='text-[10px] text-gray-400'>
						{formatearFechaHora(caja.apertura.horaApertura)}
					</span>

					{!isOpen && caja.cierre?.verificado && (
						<div className='flex items-center gap-1 mt-1 text-green-500'>
							<CheckCircleIcon className='w-3 h-3' />
							<span className='text-[9px]'>Verificado</span>
						</div>
					)}
				</div>
			),
			balance: (
				<div className='flex flex-col items-end gap-0.5'>
					<div className='flex justify-between w-full gap-4 text-[10px] text-gray-400'>
						<span>Base:</span>
						<span className='font-mono text-gray-300'>
							{formatearPesos(caja.apertura.baseInicial)}
						</span>
					</div>

					<div className='flex justify-between w-full gap-4 text-[10px] text-gray-400 mb-1 border-b border-gray-700 pb-1'>
						<span>Ventas:</span>
						<span className='font-mono text-blue-300 font-bold'>
							{formatearPesos(caja.totalVentas)}
						</span>
					</div>

					<div className='flex items-center gap-1 mt-0.5'>
						<CashIcon className='w-3 h-3 text-green-500' />
						<span className='text-xs font-bold text-green-400'>
							{formatearPesos(caja.totalEfectivo)}
						</span>
					</div>

					{(caja.totalNequi > 0 || caja.totalDaviplata > 0) && (
						<div className='flex flex-col items-end text-[9px] text-gray-500 mt-0.5'>
							{caja.totalNequi > 0 && (
								<span>Neq: {formatearPesos(caja.totalNequi)}</span>
							)}
							{caja.totalDaviplata > 0 && (
								<span>Dav: {formatearPesos(caja.totalDaviplata)}</span>
							)}
						</div>
					)}
				</div>
			),
		};
	});

	return (
		<div className='flex flex-col h-full gap-3 p-2'>
			{/* 1. Usamos el componente <Filtros> en lugar del div "a mano" */}
			<Filtros
				busqueda={busqueda}
				setBusqueda={setBusqueda}
				placeholder='Buscar caja, usuario o estado...'
			/>

			{/* Tabla */}
			<div className='flex-1 min-h-0 relative' ref={tableContainerRef}>
				{tableData.length > 0 ? (
					<MobileTable
						columns={columns}
						data={tableData}
						onViewDetail={handleViewDetail}
					/>
				) : (
					<div className='text-center text-gray-500 text-sm mt-8'>
						No se encontraron cajas.
					</div>
				)}
			</div>

			{/* Paginado */}
			<Paginado
				currentPage={currentPage}
				totalPages={totalPages}
				goToPrevPage={goToPrevPage}
				goToNextPage={goToNextPage}
			/>

			{/* 🚨 4. MODAL DETALLE DE CAJA */}
			{cajaSeleccionada && (
				<div className='fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
					<DetalleCaja caja={cajaSeleccionada} onClose={handleCloseDetail} />
				</div>
			)}
		</div>
	);
};

export default Cajas;
