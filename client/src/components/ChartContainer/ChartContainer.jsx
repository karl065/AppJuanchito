import { ChartPieIcon } from '../Icons/Icons.jsx';

const ChartContainer = ({ title, children }) => (
	<div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg col-span-2">
		<h3 className="text-sm font-bold text-white mb-3 border-b border-gray-700/50 pb-2 flex items-center gap-2">
			<ChartPieIcon className="w-4 h-4 text-red-500" />
			{title}
		</h3>
		{children}
	</div>
);

export default ChartContainer;
