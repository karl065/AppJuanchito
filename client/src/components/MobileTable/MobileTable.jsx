// --- Iconos SVG inlínea para evitar dependencia de librerías ---

import { EyeIcon, PencilIcon, TrashIcon } from '../Icons/Icons.jsx';

// Icono SVG para Lápiz (Editar)

// --- COMPONENTE REUTILIZABLE FUSIONADO (MobileTable) ---
/**
 * MobileTable Component
 * COMPONENTE REUTILIZABLE: Contiene la lógica de renderizado de tabla compacta.
 * Se define aquí para evitar el error de importación, pero está diseñado para ser agnóstico a los datos (Inventario, Usuarios, etc.).
 */
const MobileTable = ({
	columns = [],
	data = [],
	onEdit,
	onDelete,
	onViewDetail,
}) => {
	return (
		<div className='flex flex-col w-full h-full bg-transparent rounded-lg shadow-xl relative  overflow-hidden'>
			<div className='flex-1 overflow-y-auto min-h-0'>
				<table className='w-full text-sm bg-transparent table-auto border-collapse'>
					<thead className='sticky top-0 z-10 bg-white shadow-sm'>
						<tr className='border-b border-white'>
							{columns.map((col) => (
								<th
									key={col.key}
									className={`p-3 text-left  font-bold text-xs ${
										col.key === 'info' ? 'w-auto' : 'w-24 text-right'
									}`}>
									{col.label}
								</th>
							))}
							{(onEdit || onDelete || onViewDetail) && (
								<th className='p-3 text-center  w-20 font-bold text-xs'>
									Acciones
								</th>
							)}
						</tr>
					</thead>

					<tbody className='divide-y divide-white'>
						{data.map((row, i) => (
							<tr
								key={row.id || i}
								className='text-white hover:bg-gray-800/50 transition-colors'>
								{columns.map((col) => (
									<td
										key={col.key}
										className={`p-2 align-top ${
											col.key !== 'info' ? 'text-right' : ''
										}`}>
										{row[col.key]}
									</td>
								))}
								{(onEdit || onDelete || onViewDetail) && (
									<td className='p-2 text-center align-top pt-3'>
										<div className='flex justify-center gap-1.5'>
											{onViewDetail && (
												<button
													onClick={() => onViewDetail(row)}
													className='p-1.5 text-blue-400 hover:text-blue-300 bg-blue-900/30 rounded-full transition-colors active:scale-95 shadow-inner shadow-blue-900/50'
													title='Ver Detalle'>
													<EyeIcon />
												</button>
											)}
											{onEdit && (
												<button
													onClick={() => onEdit(row)}
													className='p-1.5 text-blue-400 hover:text-blue-300 bg-blue-900/30 rounded-full transition-colors active:scale-95 shadow-inner shadow-blue-900/50'
													title='Editar'>
													<PencilIcon />
												</button>
											)}
											{onDelete && (
												<button
													onClick={() => onDelete(row)}
													className='p-1.5 text-red-400 hover:text-red-300 bg-red-900/30 rounded-full transition-colors active:scale-95 shadow-inner shadow-red-900/50'
													title='Borrar'>
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
		</div>
	);
};

export default MobileTable;
