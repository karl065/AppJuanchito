import { useState, useEffect, useMemo } from 'react';

// Helper local para definir breakpoints
const getItemsPerPage = (width) => {
	if (width >= 1024) return 6; // Desktop
	else if (width >= 640) return 5; // Tablet
	return 5; // Móvil
};

/**
 * Hook personalizado para manejar paginación responsiva.
 * @param {Array} data - El array de datos filtrados a paginar.
 * @returns {Object} - Datos paginados y controles.
 */
export const usePaginacionResponsiva = (data = []) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(
		getItemsPerPage(window.innerWidth)
	);

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

	// SOLUCIÓN FINAL:
	// Calculamos la "página segura" para usar en el renderizado.
	// Eliminamos el useEffect que causaba el error de "cascading renders".
	// Si currentPage es mayor que totalPages, simplemente usamos totalPages visualmente
	// sin forzar una actualización de estado innecesaria.
	const safeCurrentPage = Math.min(currentPage, Math.max(1, totalPages));

	const paginatedData = useMemo(() => {
		// Usamos safeCurrentPage para el cálculo, asegurando que siempre mostramos datos válidos
		const startIndex = (safeCurrentPage - 1) * itemsPerPage;
		return data.slice(startIndex, startIndex + itemsPerPage);
	}, [data, safeCurrentPage, itemsPerPage]);

	// 3. Controles
	// Usamos safeCurrentPage como base para la navegación para asegurar continuidad
	// si el estado interno estaba desfasado.
	const goToPrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
	// Corregimos goToNextPage para asegurar que no exceda el totalPages actual
	const goToNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
	const resetPage = () => setCurrentPage(1);

	return {
		currentPage: safeCurrentPage, // Devolvemos safeCurrentPage para que la UI muestre el número correcto
		totalPages,
		paginatedData,
		goToPrevPage,
		goToNextPage,
		resetPage,
		itemsPerPage,
	};
};
