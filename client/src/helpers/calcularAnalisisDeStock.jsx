export const calcularAnalisisDeStock = (safeProductos) => {
	const totalStockValue = safeProductos.reduce(
		(sum, p) => sum + p.stock * (p.precio || 0),
		0
	);
	const totalStockUnits = safeProductos.reduce(
		(sum, p) => sum + (p.stock || 0),
		0
	);
	const lowStockItems = safeProductos.filter((p) => p.stock < 10).length;

	return { totalStockValue, totalStockUnits, lowStockItems };
};
