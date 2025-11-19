import sanitizarUsuario from './sanitizarUsuario.js';

const sanitizarDispositivoFull = (disp) => {
	if (!disp) return {};

	const d = disp.toObject ? disp.toObject() : disp;

	return {
		_id: d._id,
		nombreDispositivo: d.nombreDispositivo,
		fingerprint: d.fingerprint,
		esConfiable: d.trusted,
		user: d.userId ? sanitizarUsuario(d.userId) : null, // ← usuario sanitizado
		createdAt: d.createdAt || null,
		updatedAt: d.updatedAt || null,
	};
};

export default sanitizarDispositivoFull;
