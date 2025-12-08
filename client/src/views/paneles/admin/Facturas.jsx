import { useEffect, useMemo, useState } from 'react';
import { usePaginacionResponsiva } from '../../../Hooks/usePaginacionResponsiva.jsx';
import { formatearPesos } from '../../../helpers/formatearPesos.jsx';
import Filtros from '../../../components/CabeceraFiltros/Filtros.jsx';
import MobileTable from '../../../components/MobileTable/MobileTable.jsx';
import Paginado from '../../../components/Paginado/Paginado.jsx';
import { formatearFechaHora } from '../../../helpers/formatearFechaHora.jsx';
import DetalleFactura from './DetalleFactura.jsx';

const Facturas = ({ facturas, cajero }) => {
	const [busqueda, setBusqueda] = useState('');

	// Estados para el Modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);

	// --- 1. Lógica de Filtrado ---
	const facturasFiltradas = useMemo(() => {
		if (!facturas) return [];

		return facturas.filter((factura) => {
			const lowerCaseBusqueda = busqueda.toLowerCase().trim();
			const coincideTexto =
				!lowerCaseBusqueda ||
				factura._id.toLowerCase().includes(lowerCaseBusqueda) ||
				factura.usuario?.nombre.toLowerCase().includes(lowerCaseBusqueda) ||
				(factura.observaciones || '')
					.toLowerCase()
					.includes(lowerCaseBusqueda) ||
				factura.metodoPago.toLowerCase().includes(lowerCaseBusqueda);

			return coincideTexto;
		});
	}, [facturas, busqueda]);

	// --- 2. Paginación ---
	const {
		paginatedData,
		currentPage,
		totalPages,
		goToPrevPage,
		goToNextPage,
		resetPage,
	} = usePaginacionResponsiva(facturasFiltradas);

	useEffect(() => {
		resetPage();
	}, [busqueda, resetPage]);

	// --- 3. Handlers y Configuración ---
	const handleViewDetail = (row) => {
		const factura = facturas.find((f) => f._id === row.id);
		if (factura) {
			setFacturaSeleccionada(factura);
			setIsModalOpen(true);
		}
	};

	// Handler para cerrar modal
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setFacturaSeleccionada(null);
	};

	const filtersConfig = useMemo(() => [], []);

	const columns = [
		{ key: 'info', label: 'Factura y Cajero' },
		{ key: 'pago', label: 'Total y Método' },
	];

	// --- 4. Mapeo de Datos para la Tabla ---
	const tableData = paginatedData.map((factura) => {
		const detalle = factura?.detallePago;
		const metodosUsados = [];

		// Lógica para desglosar métodos de pago si es mixto
		if (factura?.metodoPago === 'mixto' && detalle) {
			if (detalle.efectivoCliente > 0)
				metodosUsados.push({
					name: 'Efectivo',
					amount: detalle.efectivoCliente,
				});
			if (detalle.daviplata > 0)
				metodosUsados.push({ name: 'Daviplata', amount: detalle.daviplata });
			if (detalle.nequi > 0)
				metodosUsados.push({ name: 'Nequi', amount: detalle.nequi });
		}

		return {
			id: factura._id,
			info: (
				<div className='flex flex-col text-left max-w-[150px] sm:max-w-full'>
					<span className='font-bold text-white uppercase text-xs wrap-break-word leading-tight'>
						Ref: {factura?._id.substring(0, 8)}...
					</span>
					<span className='text-[10px] text-gray-400 mt-0.5'>
						{formatearFechaHora(factura.createdAt)}
					</span>
					<span className='text-[10px] text-gray-500 italic mt-1'>
						Cajero: {factura.usuario?.nombre || cajero || 'N/A'}
					</span>
					{factura.observaciones && (
						<span className='text-[10px] text-yellow-400 font-medium mt-1'>
							Obs: {factura.observaciones}
						</span>
					)}
				</div>
			),
			pago: (
				<div className='flex flex-col items-end gap-1'>
					<span className='font-bold text-green-400 text-sm whitespace-nowrap'>
						{formatearPesos(factura.precioVenta)}
					</span>

					{/* Visualización de Método de Pago y Detalle Mixto */}
					{factura.metodoPago !== 'mixto' ? (
						<span className='text-[10px] text-gray-400 font-mono tracking-wide mt-1'>
							Método:{' '}
							<span className='uppercase font-bold text-white'>
								{factura.metodoPago}
							</span>
						</span>
					) : (
						<div className='flex flex-col items-end text-[10px] text-gray-400 mt-1'>
							<span className='uppercase font-bold text-white mb-0.5'>
								Mixto:
							</span>
							{metodosUsados.map((m, index) => (
								<span key={index} className='flex gap-1 text-right'>
									<span className='text-gray-500'>{m.name}:</span>
									<span className='font-bold text-gray-300'>
										{formatearPesos(m.amount)}
									</span>
								</span>
							))}
						</div>
					)}

					{detalle?.cambio > 0 && (
						<span className='text-[10px] text-orange-400 font-bold mt-1'>
							Cambio: {formatearPesos(detalle.cambio)}
						</span>
					)}
				</div>
			),
		};
	});

	return (
		<div className='flex flex-col h-full gap-3 p-2 '>
			{/* Cabecera de Filtros Reutilizable */}
			<Filtros
				busqueda={busqueda}
				setBusqueda={setBusqueda}
				placeholder='Buscar por ID, cajero u observación...'
				filters={filtersConfig}
			/>

			{/* Tabla con scroll Reutilizable */}
			<div className='flex-1 min-h-0 overflow-y-auto pb-4'>
				{tableData.length > 0 ? (
					<MobileTable
						columns={columns}
						data={tableData}
						onViewDetail={handleViewDetail}
					/>
				) : (
					<div className='text-center text-gray-500 text-sm mt-8'>
						Sin resultados.
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

			{/* MODAL INTEGRADO */}
			{isModalOpen && facturaSeleccionada && (
				<div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in bg-black/50'>
					<div className='w-full max-w-md h-[85vh] animate-fade-in-up'>
						<DetalleFactura
							factura={facturaSeleccionada}
							onClose={handleCloseModal}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Facturas;
