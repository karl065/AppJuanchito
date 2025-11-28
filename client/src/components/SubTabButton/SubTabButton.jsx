import React from 'react';

const SubTabButton = ({ index, label, icon, subTab, setSubTab }) => (
	<button
		onClick={() => setSubTab(index)}
		className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 ${
			subTab === index
				? 'text-red-500 border-red-500 bg-gray-800/50 shadow-inner shadow-red-900/10'
				: 'text-gray-400 border-transparent hover:bg-gray-800'
		}`}>
		{React.cloneElement(icon, {
			className: `w-4 h-4 ${
				subTab === index ? 'text-red-500' : 'text-gray-400'
			}`,
		})}
		{label}
	</button>
);
export default SubTabButton;
