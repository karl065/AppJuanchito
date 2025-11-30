import { Http } from '@capacitor-community/http';
import { generarTextoFactura } from './generarTextoFactura.jsx';
import { alertInfo } from './alertas.jsx';

export const imprimirFacturaWifi = async (factura, printerIp, printerPort) => {
	try {
		if (!printerIp || !printerPort) {
			throw new Error('Configuración Wi-Fi incompleta. Ingrese IP y Puerto.');
		}

		const ticketText = generarTextoFactura(factura);
		const url = `http://${printerIp}:${printerPort}/`;

		// 🚨 LÓGICA DE IMPRESIÓN CON PLUGIN HTTP NATIVO (PRODUCCIÓN)

		await Http.post({
			url: url,
			data: ticketText,
			headers: { 'Content-Type': 'application/octet-stream' },
			timeout: 5000,
		});

		alertInfo('¡Impresión Wi-Fi Simulada Enviada!');
	} catch (error) {
		console.error('Error en la impresión Wi-Fi/Red:', error);
		alertInfo(
			`Error de impresión Wi-Fi: ${
				error.message || 'Verifique la IP/Puerto y la impresora.'
			}`
		);
		throw new Error('Impresión fallida por Wi-Fi.');
	}
};
