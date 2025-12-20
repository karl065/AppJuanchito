import { useCallback, useState } from 'react';
import { alertError, alertSuccess } from './alertas';

export const useBluetoothScanner = () => {
	const [dispositivosBT, setDispositivosBT] = useState([]);
	const [scanning, setScanning] = useState(false);
	// Añadimos un estado para mensajes de estado si es necesario
	const [estadoMensaje, setEstadoMensaje] = useState('Listo para escanear');

	const iniciarEscaneo = useCallback(async () => {
		setScanning(true);
		setDispositivosBT([]);
		setEstadoMensaje('Iniciando escaneo...');

		// --- LÓGICA CORREGIDA PARA CAPACITOR/JS ---

		// 1. Verificar si el plugin está disponible en el objeto global 'window'
		if (!window.bluetoothSerial) {
			const msg =
				'El plugin BluetoothSerial no está disponible. Ejecute en un dispositivo nativo.';
			console.error(msg);
			alertError(msg);
			setEstadoMensaje('Plugin no disponible.');
			setScanning(false);
			return; // Salir de la función si no está disponible
		}

		// 2. Usar la API basada en callbacks del plugin y convertirla a Promise para usar async/await
		try {
			// Utilizamos new Promise para envolver la función list() que usa callbacks (success, error)
			const devices = await new Promise((resolve, reject) => {
				window.bluetoothSerial.list(resolve, reject);
			});

			// Filtra solo los que parecen ser impresoras
			const filteredPrinters = devices.filter(
				(d) =>
					d.name && // Asegurarse que el nombre existe
					(d.name.toLowerCase().includes('printer') ||
						d.name.toLowerCase().includes('pos') ||
						d.name.toLowerCase().includes('pt') ||
						d.name.toLowerCase().includes('impresora'))
			);

			setDispositivosBT(filteredPrinters);
			setEstadoMensaje(
				`Escaneo completado. ${filteredPrinters.length} impresoras encontradas.`
			);
			alertSuccess('Escaneo completado. Elija un dispositivo.');
		} catch (error) {
			console.log(error);
			setEstadoMensaje('Error al listar dispositivos.');
			alertError(
				'Error al listar dispositivos. Verifique Bluetooth y permisos.'
			);
		} finally {
			setScanning(false);
		}
	}, []);

	return { dispositivosBT, scanning, estadoMensaje, iniciarEscaneo };
};
