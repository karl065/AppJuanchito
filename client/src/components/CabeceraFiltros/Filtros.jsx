import React from 'react';
import DropdownControl from '../DropdownControl/DropdownControl.jsx';

// Icono SVG para Búsqueda
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

// Icono SVG para Añadir
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

const Filtros = ({
	busqueda,
	setBusqueda,
	onAdd,
	placeholder = 'Buscar...',
	addButtonTitle = 'Crear nuevo',
	extraControls = [],
}) => {
	return (
		<div className="sticky top-0 z-10 backdrop-blur-sm py-2 border-b border-white flex flex-col gap-2">
			<div className="flex gap-2 items-center w-full">
				<div className="flex-1 relative">
					<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none">
						<SearchIcon className="h-4 w-4" />
					</div>
					<input
						type="text"
						placeholder={placeholder}
						value={busqueda}
						onChange={(e) => setBusqueda(e.target.value)}
						className="w-full pl-10 pr-4 py-2 text-xs h-9 border border-white text-white rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-500 transition-colors bg-transparent"
					/>
				</div>
				<button
					className="flex items-center justify-center h-9 w-9 rounded-lg bg-red-700 hover:bg-red-600 transition-colors active:scale-95 shadow-md shadow-red-900/50 shrink-0"
					onClick={onAdd}
					title={addButtonTitle}>
					<PlusIcon className="h-5 w-5 text-white" />
				</button>
			</div>

			{/* Renderizamos DropdownControl pasándole la configuración directamente */}
			{extraControls && (
				<div className="w-full overflow-x-auto pb-1">
					<DropdownControl configs={extraControls} />
				</div>
			)}
		</div>
	);
};

export default Filtros;
