import speakeasy from 'speakeasy';
import Usuarios from '../../../models/Usuarios.js';
import postControllerDispositivos from '../../controllersDispositivos/postControllerDispositivos.js';

const verificar2FALoginController = async ({
	userId,
	code,
	fingerprint,
	nombreDispositivo,
	recordar,
}) => {
	const usuario = await Usuarios.findById(userId);
	if (!usuario) throw new Error('Usuario no encontrado');

	const validacion = speakeasy.totp.verify({
		secret: usuario.twoFactorSecret,
		encoding: 'base32',
		token: code,
		window: 1,
	});

	if (!validacion) throw new Error('Código 2FA incorrecto');

	// Si eligió recordar dispositivo
	if (recordar) {
		await postControllerDispositivos(userId, fingerprint, nombreDispositivo);
	}

	return { autorizado: true };
};

export default verificar2FALoginController;
