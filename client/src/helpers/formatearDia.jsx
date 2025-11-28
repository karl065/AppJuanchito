export const formatearDia = (dateString) => {
	const date = new Date(dateString);
	// Usamos el locale 'es-CO' para obtener los nombres de los días en español
	return date.toLocaleDateString('es-CO', { weekday: 'short' });
};
