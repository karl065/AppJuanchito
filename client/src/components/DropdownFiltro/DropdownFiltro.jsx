const DropdownFiltro = ({ label, options, selected, onChange }) => {
	return (
		<div className="relative text-left">
			<select
				className="block w-full text-xs h-9 py-1 px-3 border border-white text-white rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-500 transition-colors bg-transparent appearance-none pr-8 cursor-pointer"
				value={selected}
				onChange={(e) => onChange(e.target.value)}
				aria-label={label}>
				<option value="" className=" text-gray-400">
					{label}
				</option>
				{options.map((opt) => (
					<option
						key={opt.value}
						value={opt.value}
						className="bg-gray-800 text-white">
						{opt.label}
					</option>
				))}
			</select>
			<div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
				<svg
					className="h-4 w-4 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>
		</div>
	);
};
export default DropdownFiltro;
