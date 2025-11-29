export const formatearMonedaCompactada = (amount) => {
	if (typeof amount !== 'number') return '$0';
	if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`; // 1.5M
	if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`; // 15k
	return `$${amount}`;
};
