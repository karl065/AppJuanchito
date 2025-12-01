export const getTipoClase = (tipo) => {
	switch (tipo) {
		case 'venta':
			return 'bg-red-900/40 text-red-300 border-red-700';
		case 'entrada':
		case 'ajuste_positivo':
			return 'bg-green-900/40 text-green-300 border-green-700';
		case 'devolucion':
		case 'ajuste_negativo':
			return 'bg-yellow-900/40 text-yellow-300 border-yellow-700';
		default:
			return 'bg-gray-700/50 text-gray-400 border-gray-600';
	}
};
