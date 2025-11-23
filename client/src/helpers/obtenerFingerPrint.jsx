// helpers/fingerprintHelper.js
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Device } from '@capacitor/device';

export const obtenerFingerprint = async () => {
	if (window.Capacitor?.isNative) {
		// Android / iOS
		const info = await Device.getId();
		return info.uuid;
	} else {
		// Web
		const fp = await FingerprintJS.load();
		const result = await fp.get();
		return result.visitorId;
	}
};
