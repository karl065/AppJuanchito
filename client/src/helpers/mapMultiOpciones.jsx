import { mapOpciones } from './mapOpciones';

export const mapMultiOpciones = (configs) => {
	if (!configs || !Array.isArray(configs)) return [];

	return configs.map((config) => {
		// Llamamos a mapToOptions construyendo el objeto 'mapping' que este espera
		return mapOpciones(
			config.estadoRedux,
			{
				key: config.key,
				label: config.label,
				value: config.value,
			},
			config.nombre
		);
	});
};
