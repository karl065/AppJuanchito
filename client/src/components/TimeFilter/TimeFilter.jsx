const TimeFilter = ({ selected, setSelected }) => {
	const options = ['Hoy', 'Semana', 'Mes'];
	return (
		<div className="flex justify-around bg-white rounded-xl p-1 shadow-inner shadow-black/30 w-full mb-3">
			{options.map((option) => (
				<button
					key={option}
					onClick={() => setSelected(option)}
					className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-colors active:scale-95 ${
						selected === option
							? 'bg-red-700 text-white shadow-md shadow-red-900/50'
							: 'text-black hover:bg-gray-700'
					}`}>
					{option}
				</button>
			))}
		</div>
	);
};
export default TimeFilter;
