import { alertInfo } from './alertas.jsx';
import { generarTextoFactura } from './generarTextoFactura.jsx';

export const imprimirFacturaBluetooth = async (factura, printerAddress) => {
	// 1. Verificar si el plugin está disponible
	if (!window.bluetoothSerial) {
		console.warn('Simulación de impresión: Plugin BT no disponible.');
		// Usamos la simulación si no estamos en entorno nativo
		console.log('--- TICKET BLUETOOTH SIMULADO (ESC/POS) ---');
		console.log('Dirección MAC objetivo: ', printerAddress);
		console.log(generarTextoFactura(factura));
		alertInfo('¡Impresión Bluetooth Simulada Enviada!');
		return;
	}

	try {
		if (!printerAddress) {
			throw new Error(
				'Dirección Bluetooth (MAC) de impresora no proporcionada.'
			);
		}

		const ticketText = generarTextoFactura(factura);

		// --- LÓGICA DE IMPRESIÓN CON PLUGIN BLUETOOTH SERIAL (PRODUCCIÓN) ---

		console.log(`Intentando conectar a: ${printerAddress}`);

		// Envolver connect en una Promise
		await new Promise((resolve, reject) => {
			window.bluetoothSerial.connect(printerAddress, resolve, reject);
		});
		console.log('Conexión exitosa.');

		// Envolver write en una Promise
		await new Promise((resolve, reject) => {
			// El callback de éxito de write() a veces no recibe argumentos,
			// pero si usas el método write original, funciona así:
			window.bluetoothSerial.write(ticketText, () => resolve(true), reject);
		});
		console.log('Datos enviados a la impresora.');

		// Envolver disconnect en una Promise
		await new Promise((resolve) => {
			// Disconnect a menudo no tiene un callback de error útil,
			// pero lo manejamos de forma segura.
			window.bluetoothSerial.disconnect(resolve, resolve);
		});
		console.log('Desconexión exitosa.');

		alertInfo('¡Impresión Bluetooth Exitosa Enviada!');
	} catch (error) {
		console.error('Error grave en la impresión Bluetooth:', error);
		// Intentar desconectar si hubo un error en medio de la operación
		if (window.bluetoothSerial && window.bluetoothSerial.isConnected) {
			window.bluetoothSerial.disconnect();
		}

		alertInfo(
			`Error de impresión BT: ${
				error.message ||
				'Verifica la conexión, permisos o si la impresora está encendida.'
			}`
		);
		throw new Error('Impresión fallida.');
	}
};
