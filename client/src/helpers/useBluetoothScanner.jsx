import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial';
import { useCallback, useState } from 'react';
import { alertError, alertSuccess } from './alertas';

export const useBluetoothScanner = () => {
	const [dispositivosBT, setDispositivosBT] = useState([]);
	const [scanning, setScanning] = useState(false);

	const iniciarEscaneo = useCallback(async () => {
		setScanning(true);
		setDispositivosBT([]);

		// 🚨 LÓGICA REAL DEL PLUGIN DE CAPACITOR:

		try {
			const devices = await BluetoothSerial.list(); // Obtiene dispositivos emparejados
			// Filtra solo los que parecen ser impresoras
			const filteredPrinters = devices.filter(
				(d) =>
					d.name.toLowerCase().includes('printer') ||
					d.name.toLowerCase().includes('pos') ||
					d.name.toLowerCase().includes('impresora')
			);
			setDispositivosBT(filteredPrinters);
			alertSuccess('Escaneo completado. Elija un dispositivo.');
		} catch (error) {
			console.log(error);
			alertError(
				'Error al listar dispositivos. Verifique Bluetooth y permisos.'
			);
		} finally {
			setScanning(false);
		}
	}, []);

	return { dispositivosBT, scanning, iniciarEscaneo };
};
