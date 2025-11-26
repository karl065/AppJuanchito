import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
} from 'flowbite-react';

const MobileTable = ({ columns = [], data = [], onEdit, onDelete }) => {
	return (
		<div className="w-full overflow-x-auto">
			<Table className="min-w-max text-sm">
				{/* ENCABEZADO */}
				<TableHead>
					{columns.map((col) => (
						<TableHeadCell key={col.key} className="p-2 text-center">
							{col.label}
						</TableHeadCell>
					))}

					{(onEdit || onDelete) && (
						<TableHeadCell className="p-2 text-center">Acciones</TableHeadCell>
					)}
				</TableHead>

				{/* FILAS */}
				<TableBody className="divide-y">
					{data.map((row, i) => (
						<TableRow
							key={i}
							className="bg-gray-800 text-white hover:bg-gray-700 transition">
							{columns.map((col) => (
								<TableCell key={col.key} className="p-2 text-center">
									{row[col.key]}
								</TableCell>
							))}

							{/* Acciones */}
							{(onEdit || onDelete) && (
								<TableCell className="p-2 flex justify-center gap-2">
									{onEdit && (
										<button
											className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
											onClick={() => onEdit(row)}>
											Editar
										</button>
									)}

									{onDelete && (
										<button
											className="px-2 py-1 bg-red-600 text-white rounded text-xs"
											onClick={() => onDelete(row)}>
											Borrar
										</button>
									)}
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default MobileTable;
