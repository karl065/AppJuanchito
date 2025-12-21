import { Geolocation } from '@capacitor/geolocation';
// import { BleClient } from '@capacitor-community/bluetooth-le'; // Descomentar si usas Bluetooth LE
// import { BluetoothSerial } from 'capacitor-bluetooth-serial'; // Descomentar si usas Bluetooth Serial
import { Capacitor } from '@capacitor/core';

/**
 * Servicio de Permisos adaptado al AndroidManifest.xml
 * Permisos Críticos detectados:
 * 1. ACCESS_FINE_LOCATION (Para Bluetooth Legacy y Geolocalización)
 * 2. BLUETOOTH_SCAN / BLUETOOTH_CONNECT (Android 12+)
 */
const solicitarPermisosApp = async () => {
	// Solo ejecutar en dispositivos nativos (iOS/Android)
	if (!Capacitor.isNativePlatform()) {
		console.log('No estamos en móvil, saltando chequeo de permisos.');
		return;
	}

	console.log('Iniciando comprobación de permisos del Manifiesto...');

	try {
		// --- 1. UBICACIÓN (ACCESS_FINE_LOCATION) ---
		// Vital para escanear dispositivos Bluetooth en Android 11 o inferior.
		await verificarPermisoPlugin(
			'Geolocation (Legacy Bluetooth)',
			async () => await Geolocation.checkPermissions(),
			async () => await Geolocation.requestPermissions()
		);

		// --- 2. BLUETOOTH (BLUETOOTH_SCAN / BLUETOOTH_CONNECT) ---
		// Para Android 12+, estos permisos suelen gestionarlos los plugins específicos.
		// Descomenta el bloque correspondiente a tu librería de Bluetooth:

		/* OPCIÓN A: Si usas @capacitor-community/bluetooth-le
        try {
            await BleClient.initialize(); // Esto dispara la solicitud de permisos en Android 12+
            console.log('Bluetooth LE inicializado y permisos solicitados');
        } catch (error) {
            console.error('Error inicializando Bluetooth LE:', error);
        }
        */

		/* OPCIÓN B: Si usas capacitor-bluetooth-serial
        try {
             // Este plugin suele pedir permisos al intentar conectar o escanear,
             // pero algunos forks tienen métodos explícitos.
             // await BluetoothSerial.requestEnable(); 
        } catch (error) {
             console.error('Error Bluetooth Serial:', error);
        }
        */

		// --- OTROS PERMISOS (Desactivados por no estar en tu manifiesto actual) ---
		/*
        await verificarPermisoPlugin(
            'Camera', 
            async () => await Camera.checkPermissions(),
            async () => await Camera.requestPermissions()
        );
        
        const pushStatus = await PushNotifications.checkPermissions();
        if (pushStatus.receive !== 'granted') {
             await PushNotifications.requestPermissions();
        }
        */

		console.log('Chequeo de permisos finalizado.');
	} catch (error) {
		console.error('Error general solicitando permisos:', error);
	}
};

/**
 * Función auxiliar para verificar y solicitar un permiso genérico
 */
const verificarPermisoPlugin = async (nombrePlugin, checkFn, requestFn) => {
	try {
		// 1. Verificar estado actual
		const status = await checkFn();

		// Buscamos propiedad 'location', 'public', etc. o asumimos prompt
		const estadoPrincipal = status.location || status.public || 'prompt';

		// Si ya tenemos permiso, salimos
		if (estadoPrincipal === 'granted') {
			console.log(`Permiso de ${nombrePlugin} ya concedido.`);
			return;
		}

		if (estadoPrincipal === 'denied') {
			console.warn(`Permiso de ${nombrePlugin} denegado previamente.`);
			// Aquí podrías mostrar un diálogo sugiriendo ir a Ajustes
			return;
		}

		// Si está en 'prompt' o 'prompt-with-rationale', pedimos
		console.log(`Solicitando permiso para: ${nombrePlugin}...`);
		await requestFn();
	} catch (err) {
		console.warn(
			`El plugin ${nombrePlugin} no parece estar instalado o falló:`,
			err
		);
	}
};

export default solicitarPermisosApp;
