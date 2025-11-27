export const mapOpciones = (data, mapping, nombre) => {
	if (!data || !Array.isArray(data)) return [];

	return data.map((item) => ({
		key: item[mapping.key],
		label: item[mapping.label],
		value: item[mapping.value],
		nombre,
	}));
};
