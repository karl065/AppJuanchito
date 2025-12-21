import speakeasy from 'speakeasy';
import Usuarios from './../../../models/Usuarios.js';
import sanitizarUsuario from '../../../helpers/sanitizadores/sanitizarUsuario.js';
import putControllerUsuario from '../putControllerUsuario.js';
import postControllerDispositivos from '../../controllersDispositivos/postControllerDispositivos.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { SECRETA } = process.env;

const verificar2FASetupController = async ({
	userId,
	code,
	fingerprint,
	nombreDispositivo,
	recordar,
}) => {
	try {
		const usuario = await Usuarios.findById(userId)
			.populate('dispositivos')
			.populate('movimientos')
			.populate('facturas')
			.populate({
				path: 'caja', // 1. Entramos a 'caja'
				populate: {
					path: 'facturas', // 2. Dentro de 'caja', poblamos 'facturas'
				},
			});
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

		// Aseguramos obtener el objeto usuario de la respuesta del put
		const usuarioActualizadoData = Array.isArray(usuarioAutorizado)
			? usuarioAutorizado[0]
			: usuarioAutorizado;

		// --- GENERAR TOKEN (Igual que en el Login) ---
		const tiempoExpiracion = recordar ? '7d' : '1d';

		const tokenSesion = jwt.sign(
			{
				id: usuario._id,
				role: usuario.role,
				correo: usuario.correo,
			},
			SECRETA,
			{ expiresIn: tiempoExpiracion }
		);

		const usuarioSanitizado = await sanitizarUsuario(usuarioActualizadoData);
		usuarioSanitizado.autorizado = true;

		// Retornamos objeto con token y usuario
		return {
			token: tokenSesion,
			usuario: usuarioSanitizado,
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

export default verificar2FASetupController;
