const Tooltip = ({ text, children }) => {
	return (
		<div className="relative group inline-flex items-center">
			{children}
			<div className="absolute left-1/2 bottom-full transform -translate-x-1/2 mb-2 w-max max-w-xs p-2 text-xs text-white bg-gray-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-gray-600">
				{text}
				<div className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rotate-45 border-r border-b border-gray-600"></div>
			</div>
		</div>
	);
};

export default Tooltip;
