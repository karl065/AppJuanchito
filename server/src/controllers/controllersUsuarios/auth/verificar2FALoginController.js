import speakeasy from 'speakeasy';
import Usuarios from '../../../models/Usuarios.js';
import postControllerDispositivos from '../../controllersDispositivos/postControllerDispositivos.js';
import sanitizarUsuario from '../../../helpers/sanitizadores/sanitizarUsuario.js';
import putControllerUsuario from './../putControllerUsuario.js';

const verificar2FALoginController = async ({
	userId,
	code,
	fingerprint,
	nombreDispositivo,
	recordar,
}) => {
	try {
		const usuario = await Usuarios.findById(userId).populate('dispositivos');
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
			await postControllerDispositivos(
				userId,
				fingerprint,
				nombreDispositivo,
				recordar
			);
		}

		const usuarioAutorizado = await putControllerUsuario(
			{ userStatus: true },
			userId
		);

		const usuarioSanitizado = await sanitizarUsuario(usuarioAutorizado[0]);
		usuarioSanitizado.autorizado = true;

		return usuarioSanitizado;
	} catch (error) {
		return error;
	}
};

export default verificar2FALoginController;
