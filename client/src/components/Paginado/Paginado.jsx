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

/**
 * Componente reutilizable para los controles de paginación.
 * Debe ser colocado al final de un contenedor flex-col que tenga scrollable content.
 */
const Paginado = ({ currentPage, totalPages, goToPrevPage, goToNextPage }) => {
	// Si no hay páginas o solo hay una, no se muestra el control.
	if (totalPages <= 1) {
		return null;
	}

	return (
		// Los controles están fijos en la parte inferior, idealmente dentro de un contenedor min-h-screen/h-full.
		<div className="sticky bottom-0 z-10 flex justify-between items-center px-4 py-2 rounded-lg text-white text-xs shadow-lg border w-60 sm:w-auto border-white mt-auto">
			{/* Botón Anterior */}
			<button
				onClick={goToPrevPage}
				disabled={currentPage === 1}
				className={`flex items-center px-3 py-1 rounded-full transition-all ${
					currentPage === 1
						? 'text-gray-500 cursor-not-allowed'
						: 'bg-red-700 hover:bg-red-600 active:scale-95'
				}`}
				title="Página anterior">
				<ChevronLeftIcon className="h-4 w-4" />
				<span className="ml-1 hidden sm:inline">Anterior</span>
			</button>

			{/* Indicador de Página */}
			<span className="font-semibold text-gray-300">
				Página {currentPage} de {totalPages}
			</span>

			{/* Botón Siguiente */}
			<button
				onClick={goToNextPage}
				disabled={currentPage === totalPages}
				className={`flex items-center px-3 py-1 rounded-full transition-all ${
					currentPage === totalPages
						? 'text-gray-500 cursor-not-allowed'
						: 'bg-red-700 hover:bg-red-600 active:scale-95'
				}`}
				title="Página siguiente">
				<span className="mr-1 hidden sm:inline">Siguiente</span>
				<ChevronRightIcon className="h-4 w-4" />
			</button>
		</div>
	);
};

export default Paginado;
