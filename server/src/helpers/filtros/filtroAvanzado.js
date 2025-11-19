// helpers/filters/filtroAvanzado.js

/**
 * Construye filtros avanzados para MongoDB.
 *
 * @param {Object} filters - Filtros recibidos del cliente (req.query o params).
 * @param {Object} config - Configuración de reglas para cada campo.
 *
 * Reglas soportadas:
 * - type: "regex" | "equals" | "numberRange" | "dateRange" | "in"
 * - field: nombre real del campo en Mongo
 *
 * Ejemplo config:
 * {
 *   nombre: { type: "regex" },
 *   role: { type: "equals" },
 *   precio: { type: "numberRange" },
 *   fechaInicio: { type: "dateRange" },
 *   estado: { type: "in" }
 * }
 *
 */

const filtroAvanzado = (filters = {}, config = {}) => {
	const where = {};

	for (const key in config) {
		const rule = config[key];
		const value = filters[key];

		// Campos para rangos deben venir como: campoIni, campoFin
		const from = filters[key + 'Ini'];
		const to = filters[key + 'Fin'];

		// Si el valor no existe y no hay rangos → saltar
		if (!value && !from && !to) continue;

		// Aplica reglas según el tipo configurado
		switch (rule.type) {
			case 'regex':
				where[rule.field || key] = new RegExp(`${value}`, 'i');
				break;

			case 'equals':
				where[rule.field || key] = value;
				break;

			case 'numberRange':
			case 'dateRange':
				where[rule.field || key] = {};
				if (from) where[rule.field || key].$gte = from;
				if (to) where[rule.field || key].$lte = to;
				break;

			case 'in':
				where[rule.field || key] = Array.isArray(value)
					? value
					: value.split(','); // admite: ?estado=A,B,C
				break;

			default:
				break;
		}
	}

	return where;
};

export default filtroAvanzado;
