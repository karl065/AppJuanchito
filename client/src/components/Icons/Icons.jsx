import React from 'react';

// =================================================================================================
// COLECCIÓN DE ICONOS SVG REUTILIZABLES
// =================================================================================================

export const SearchIcon = (props) => (
	<svg
		{...props}
		className={`w-5 h-5 ${props.className || ''}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
		/>
	</svg>
);

export const PlusIcon = (props) => (
	<svg
		{...props}
		className={`w-5 h-5 ${props.className || ''}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 4v16m8-8H4"
		/>
	</svg>
);

export const EyeIcon = (props) => (
	<svg
		{...props}
		className={`w-4 h-4 ${props.className || ''}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
		/>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
		/>
	</svg>
);

export const PencilIcon = (props) => (
	<svg
		{...props}
		className={`w-4 h-4 ${props.className || ''}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
		/>
	</svg>
);

export const TrashIcon = (props) => (
	<svg
		{...props}
		className={`w-4 h-4 ${props.className || ''}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
		/>
	</svg>
);

export const ChevronLeftIcon = (props) => (
	<svg
		{...props}
		className={`w-5 h-5 ${props.className || ''}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M15 19l-7-7 7-7"
		/>
	</svg>
);

export const ChevronRightIcon = (props) => (
	<svg
		{...props}
		className={`w-5 h-5 ${props.className || ''}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9 5l7 7-7 7"
		/>
	</svg>
);

export const CashIcon = (props) => (
	<svg
		{...props}
		className={`w-4 h-4 ${props.className || ''}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
		/>
	</svg>
);

export const CheckCircleIcon = (props) => (
	<svg
		{...props}
		className={`w-4 h-4 ${props.className || ''}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
);
// Flecha Arriba (Salida / Resta Stock)
export const ArrowUpIcon = (props) => (
	<svg
		{...props}
		className={`w-4 h-4 ${props.className || ''}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M5 10l7-7m0 0l7 7m-7-7v18"
		/>
	</svg>
);

// Flecha Abajo (Entrada / Suma Stock)
export const ArrowDownIcon = (props) => (
	<svg
		{...props}
		className={`w-4 h-4 ${props.className || ''}`}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M19 14l-7 7m0 0l-7-7m7 7V3"
		/>
	</svg>
);
