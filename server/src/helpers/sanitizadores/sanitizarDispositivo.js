const sanitizarDispositivo = (disp) => {
	return {
		_id: disp._id,
		nombreDispositivo: disp.nombreDispositivo,
		fingerprint: disp.fingerprint,
		esConfiable: disp.trusted,
	};
};

export default sanitizarDispositivo;
