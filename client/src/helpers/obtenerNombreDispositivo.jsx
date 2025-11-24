export const obtenerNombreDispositivo = () => {
	const ua = navigator.userAgent;

	if (/Android/.test(ua)) {
		const modelo = ua.match(/\((.*?)\)/)?.[1];
		return `Android (${modelo || 'Dispositivo Android'})`;
	}

	if (/iPhone/.test(ua)) return 'iPhone';
	if (/iPad/.test(ua)) return 'iPad';
	if (/Windows/.test(ua)) return 'PC Windows';
	if (/Macintosh/.test(ua)) return 'Mac';
	if (/mobile/i.test(ua)) return 'Dispositivo Móvil';

	return 'Dispositivo Desconocido';
};
