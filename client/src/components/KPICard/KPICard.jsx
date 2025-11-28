import React from 'react';

const KPICard = ({ title, value, unit = '', icon, isMain = false }) => {
	return (
		<div
			className={`p-3 rounded-xl border border-gray-700 shadow-lg ${
				isMain ? 'col-span-2 bg-gray-700/50' : 'bg-gray-800'
			}`}>
			<div className="flex justify-between items-center mb-1">
				<span
					className={`text-[10px] font-bold uppercase tracking-widest ${
						isMain ? 'text-red-300' : 'text-gray-400'
					}`}>
					{title}
				</span>
				{icon &&
					React.cloneElement(icon, { className: 'w-4 h-4 text-gray-500' })}
			</div>

			<span
				className={`text-xl font-extrabold ${
					isMain ? 'text-red-500 sm:text-3xl' : 'text-white sm:text-xl'
				}`}>
				{value}
			</span>

			{unit && (
				<span className="text-[10px] text-gray-500 block mt-1">{unit}</span>
			)}
		</div>
	);
};

export default KPICard;
