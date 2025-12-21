import speakeasy from 'speakeasy';
import Usuarios from '../../../models/Usuarios.js';
import postControllerDispositivos from '../../controllersDispositivos/postControllerDispositivos.js';
import sanitizarUsuario from '../../../helpers/sanitizadores/sanitizarUsuario.js';
import putControllerUsuario from './../putControllerUsuario.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { SECRETA } = process.env;

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

		// let confiable;

		// Si eligió recordar dispositivo
		if (recordar) {
			const confiable = await postControllerDispositivos(
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
		const vigente = confiable && new Date(confiable.expiresAt) > new Date();

		// let tokenSesion;

		if (vigente) {
			// 🔥 Dispositivo confiable → generar token de sesión
			const tokenSesion = jwt.sign(
				{
					id: usuario._id,
					role: usuario.role,
					correo: usuario.correo,
				},
				SECRETA,
				{ expiresIn: '7d' }
			);
		}

		const usuarioSanitizado = await sanitizarUsuario(usuarioAutorizado[0]);
		usuarioSanitizado.autorizado = true;

		return {
			loginApproved: true,
			require2FA: false,
			token: tokenSesion,
			usuario: usuarioSanitizado,
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

export default verificar2FALoginController;
