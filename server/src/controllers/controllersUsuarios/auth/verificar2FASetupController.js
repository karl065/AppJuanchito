import speakeasy from 'speakeasy';
import Usuarios from './../../../models/Usuarios.js';

const verificar2FASetupController = async ({ userId, code }) => {
	try {
		const usuario = await Usuarios.findById(userId);
		if (!usuario) throw new Error('Usuario no encontrado');

		const validacion = speakeasy.totp.verify({
			secret: usuario.twoFactorSecret,
			encoding: 'base32',
			token: code,
			window: 1,
		});

		if (!validacion) throw new Error('Código incorrecto');

		await Usuarios.findByIdAndUpdate(userId, {
			twoFactorEnabled: true,
		});

		return true;
	} catch (error) {
		throw new Error(error.message);
	}
};

export default verificar2FASetupController;
