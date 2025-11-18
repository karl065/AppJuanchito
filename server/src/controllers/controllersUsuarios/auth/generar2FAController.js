import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import dotenv from 'dotenv';
import Usuarios from '../../../models/Usuarios.js';

dotenv.config();

const { APP_NAME } = process.env;

const generar2FAController = async (userId) => {
	try {
		const usuario = await Usuarios.findById(userId);
		if (!usuario) throw new Error('Usuario no encontrado');

		const secret = speakeasy.generateSecret({
			name: `${APP_NAME} (${usuario.correo})`,
			length: 20,
		});

		const qrCode = await qrcode.toDataURL(secret.otpauth_url);

		await Usuarios.findByIdAndUpdate(userId, {
			twoFactorSecret: secret.base32,
		});

		return {
			qr: qrCode,
			otpauth: secret.otpauth_url,
		};
	} catch (error) {
		return error.message;
	}
};

export default generar2FAController;
