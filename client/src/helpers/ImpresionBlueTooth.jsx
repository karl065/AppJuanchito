import { alertInfo } from './alertas.jsx';
import { generarTextoFactura } from './generarTextoFactura.jsx';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';

export const imprimirFacturaBluetooth = async (factura, printerAddress) => {
	try {
		if (!printerAddress) {
			throw new Error(
				'Dirección Bluetooth (MAC) de impresora no proporcionada.'
			);
		}

		const ticketText = generarTextoFactura(factura);

		// 🚨 LÓGICA DE IMPRESIÓN CON PLUGIN BLUETOOTH SERIAL (PRODUCCIÓN)

		await BluetoothSerial.connect(printerAddress);
		await BluetoothSerial.write(ticketText);
		await BluetoothSerial.disconnect();

		// 🚨 SIMULACIÓN PARA PRUEBAS (Navegador)
		console.log('--- TICKET BLUETOOTH SIMULADO (ESC/POS) ---');
		console.log('Dirección MAC objetivo: ', printerAddress);
		console.log(ticketText);

		alertInfo('¡Impresión Bluetooth Simulada Enviada!');
	} catch (error) {
		console.error('Error en la impresión Bluetooth:', error);
		alertInfo(
			`Error de impresión BT: ${
				error.message || 'Verifica la conexión o permisos.'
			}`
		);
		throw new Error('Impresión fallida.');
	}
};
