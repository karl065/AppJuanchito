export const formatearFechaHora = (dateString) => {
	if (!dateString) return 'N/A';
	return new Date(dateString).toLocaleString('es-CO', {
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});
};
