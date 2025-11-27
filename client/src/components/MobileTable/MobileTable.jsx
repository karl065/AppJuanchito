// --- Iconos SVG inlínea para evitar dependencia de librerías ---

// Icono SVG para Lápiz (Editar)
const PencilIcon = () => (
	<svg
		className="h-4 w-4"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
		/>
	</svg>
);

// Icono SVG para Basura (Borrar)
const TrashIcon = () => (
	<svg
		className="h-4 w-4"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
		/>
	</svg>
);

// --- COMPONENTE REUTILIZABLE FUSIONADO (MobileTable) ---
/**
 * MobileTable Component
 * COMPONENTE REUTILIZABLE: Contiene la lógica de renderizado de tabla compacta.
 * Se define aquí para evitar el error de importación, pero está diseñado para ser agnóstico a los datos (Inventario, Usuarios, etc.).
 */
const MobileTable = ({ columns = [], data = [], onEdit, onDelete }) => {
	return (
		<div className="w-full bg-transparent rounded-lg shadow-xl overflow-x-auto">
			<table className="w-full text-sm bg-transparent table-auto border-collapse">
				<thead>
					<tr className="border-b border-gray-300">
						{columns.map((col) => (
							<th
								key={col.key}
								className={`p-2 text-left bg-white text-gray-800 font-bold whitespace-nowrap text-xs ${
									col.key === 'info' ? 'w-auto' : 'w-24 text-right'
								}`}>
								{col.label}
							</th>
						))}
						{(onEdit || onDelete) && (
							<th className="p-2 text-center bg-white text-gray-800 w-20 font-bold text-xs">
								Acciones
							</th>
						)}
					</tr>
				</thead>

				<tbody className="divide-y divide-white ">
					{data.map((row, i) => (
						<tr
							key={row.id || i}
							className=" text-white transition-colors hover:bg-gray-800/50">
							{columns.map((col) => (
								<td
									key={col.key}
									className={`p-2 align-top ${
										col.key !== 'info' ? 'text-right' : ''
									}`}>
									{row[col.key]}
								</td>
							))}

							{/* Acciones */}
							{(onEdit || onDelete) && (
								<td className="p-2 text-center align-top">
									<div className="flex justify-center gap-1.5">
										{onEdit && (
											<button
												onClick={() => onEdit(row)}
												className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-900/30 rounded-full transition-colors active:scale-95 shadow-inner shadow-blue-900/50"
												title="Editar">
												<PencilIcon />
											</button>
										)}
										{onDelete && (
											<button
												onClick={() => onDelete(row)}
												className="p-1.5 text-red-400 hover:text-red-300 bg-red-900/30 rounded-full transition-colors active:scale-95 shadow-inner shadow-red-900/50"
												title="Borrar">
												<TrashIcon />
											</button>
										)}
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MobileTable;
