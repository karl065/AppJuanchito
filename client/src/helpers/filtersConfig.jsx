export const filtersConfigs = (estadosOpciones, selected, onChange) => {
	return estadosOpciones.map((options) => ({
		label: options[0]?.nombre || 'Opciones',
		options: options,
		selected: selected,
		onChange: onChange,
	}));
};
