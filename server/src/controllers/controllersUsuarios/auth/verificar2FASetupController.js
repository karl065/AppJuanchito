import speakeasy from 'speakeasy';
import Usuarios from './../../../models/Usuarios.js';
import sanitizarUsuario from '../../../helpers/sanitizadores/sanitizarUsuario.js';
import putControllerUsuario from '../putControllerUsuario.js';
import postControllerDispositivos from '../../controllersDispositivos/postControllerDispositivos.js';

const verificar2FASetupController = async ({
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

		if (!validacion) throw new Error('Código incorrecto');

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
			{ userStatus: true, twoFactorEnabled: true },
			userId
		);

		const usuarioSanitizado = await sanitizarUsuario(usuarioAutorizado[0]);
		usuarioSanitizado.autorizado = true;

		return usuarioSanitizado;
	} catch (error) {
		throw new Error(error.message);
	}
};

export default verificar2FASetupController;
