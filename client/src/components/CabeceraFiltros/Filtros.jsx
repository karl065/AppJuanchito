import React from 'react';
import DropdownControl from '../DropdownControl/DropdownControl.jsx';
import { PlusIcon, SearchIcon } from '../Icons/Icons.jsx';

// Icono SVG para Búsqueda

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
					<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none"></div>
					<input
						type="text"
						placeholder={placeholder}
						value={busqueda}
						onChange={(e) => setBusqueda(e.target.value)}
						className="w-full pl-10 pr-4 py-2 text-xs h-9 border border-white text-white rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-500 transition-colors bg-transparent"
					/>
				</div>
				{/* Renderizado condicional del botón agregar */}
				{onAdd && (
					<button
						onClick={onAdd}
						className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition-all active:scale-95">
						{addButtonTitle}
					</button>
				)}
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
