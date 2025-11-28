export const formatearLabel = (type) => {
	if (!type) return '';
	// Reemplaza guiones bajos por espacios y capitaliza
	return type.replace(/_/g, ' ').toUpperCase();
};
