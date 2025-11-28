import { ChevronDownIcon } from '../Icons/Icons.jsx';

const UserFilter = ({ users, selected, setSelected }) => {
	const options = [
		{ _id: 'all', nombre: 'Todos los Usuarios' },
		// Filtramos usuarios sin _id para evitar errores
		...users.filter((u) => u._id),
	];

	return (
		<div className="relative w-full mb-3">
			<select
				value={selected}
				onChange={(e) => setSelected(e.target.value)}
				className="block w-full appearance-none bg-gray-800 text-white border border-gray-700 rounded-xl py-2 px-4 pr-8 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow">
				{options.map((user) => (
					<option key={user._id} value={user._id}>
						{user.nombre}
					</option>
				))}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
				<ChevronDownIcon className="w-4 h-4" />
			</div>
		</div>
	);
};
export default UserFilter;
