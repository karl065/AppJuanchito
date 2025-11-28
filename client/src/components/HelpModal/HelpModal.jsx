import { XIcon } from '../Icons/Icons.jsx';

const HelpModal = ({ title, onClose, children }) => (
	<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
		<div className="bg-gray-800 p-6 rounded-xl shadow-2xl max-w-lg w-full border border-gray-700">
			<div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
				<h4 className="text-lg font-bold text-red-400">{title}</h4>
				<button
					onClick={onClose}
					className="text-gray-400 hover:text-white transition-colors p-1">
					<XIcon className="w-5 h-5" />
				</button>
			</div>
			<div className="text-sm text-gray-300 space-y-3 max-h-96 overflow-y-auto">
				{children}
			</div>
		</div>
	</div>
);
export default HelpModal;
