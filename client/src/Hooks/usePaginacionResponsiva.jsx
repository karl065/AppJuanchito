import { useState, useEffect, useMemo, useCallback } from 'react';

// Helper local para definir breakpoints
const getItemsPerPage = (width) => {
	if (width >= 1024) return 5; // Desktop
	else if (width >= 640) return 4; // Tablet
	return 4; // Móvil
};

/**
 * Hook personalizado para manejar paginación responsiva.
 * @param {Array} data - El array de datos filtrados a paginar.
 * @returns {Object} - Datos paginados y controles.
 */
export const usePaginacionResponsiva = (data = []) => {
	// Verificamos window para evitar errores en SSR (opcional pero recomendado)
	const [itemsPerPage, setItemsPerPage] = useState(() =>
		typeof window !== 'undefined' ? getItemsPerPage(window.innerWidth) : 5
	);
	const [currentPage, setCurrentPage] = useState(1);

	// 1. Manejo del Resize
	useEffect(() => {
		const handleResize = () => {
			const newItems = getItemsPerPage(window.innerWidth);
			setItemsPerPage((prev) => {
				if (prev !== newItems) {
					setCurrentPage(1); // Resetear página si cambia el layout
					return newItems;
				}
				return prev;
			});
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// 2. Cálculos derivados
	const totalPages = Math.ceil(data.length / itemsPerPage);

	// Calculamos la "página segura" para usar en el renderizado.
	const safeCurrentPage = Math.min(currentPage, Math.max(1, totalPages));

	const paginatedData = useMemo(() => {
		// Si no hay datos, retornamos array vacío para evitar cálculos erróneos
		if (data.length === 0) return [];

		const startIndex = (safeCurrentPage - 1) * itemsPerPage;
		return data.slice(startIndex, startIndex + itemsPerPage);
	}, [data, safeCurrentPage, itemsPerPage]);

	// 3. Controles (CORREGIDO: Uso de useCallback)
	// Usamos useCallback para que la referencia de la función no cambie en cada render.
	// Esto evita que los useEffects dependientes de estas funciones se disparen innecesariamente.

	const goToPrevPage = useCallback(() => {
		setCurrentPage((p) => Math.max(1, p - 1));
	}, []);

	const goToNextPage = useCallback(() => {
		setCurrentPage((p) => Math.min(totalPages, p + 1));
	}, [totalPages]); // Dependencia necesaria: totalPages

	const resetPage = useCallback(() => {
		setCurrentPage(1);
	}, []);

	return {
		currentPage: safeCurrentPage, // Usamos safeCurrentPage para la UI
		totalPages,
		paginatedData,
		goToPrevPage,
		goToNextPage,
		resetPage,
		itemsPerPage,
	};
};
