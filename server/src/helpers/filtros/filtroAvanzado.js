// helpers/filtroAvanzadoAuto.js
const generarConfigDesdeSchema = (schema) => {
	const config = {};
	for (const [key, path] of Object.entries(schema.paths)) {
		if (key === '__v') continue;

		if (path.instance === 'String') config[key] = { type: 'regex' };
		else if (path.instance === 'Number') config[key] = { type: 'numberRange' };
		else if (path.instance === 'Date') config[key] = { type: 'dateRange' };
		else if (path.enumValues && path.enumValues.length)
			config[key] = { type: 'in' };
		else config[key] = { type: 'equals' };
	}
	return config;
};

const filtroAvanzado = (filters = {}, schema) => {
	const config = generarConfigDesdeSchema(schema);
	const where = {};
	for (const key in config) {
		const rule = config[key];
		const value = filters[key];
		const from = filters[key + 'Ini'];
		const to = filters[key + 'Fin'];
		if (!value && !from && !to) continue;

		switch (rule.type) {
			case 'regex':
				where[key] = new RegExp(`${value}`, 'i');
				break;
			case 'equals':
				where[key] = value;
				break;
			case 'numberRange':
			case 'dateRange':
				where[key] = {};
				if (from) where[key].$gte = from;
				if (to) where[key].$lte = to;
				break;
			case 'in':
				where[key] = Array.isArray(value) ? value : value.split(',');
				break;
			default:
				break;
		}
	}
	return where;
};

export default filtroAvanzado;
