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
		// 1. Buscar usuario
		const usuario = await Usuarios.findOne({ correo })
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

		// 2. Verificar código 2FA
		const validacion = speakeasy.totp.verify({
			secret: usuario.twoFactorSecret,
			encoding: 'base32',
			token: code,
			window: 1,
		});

		if (!validacion) throw new Error('Código 2FA incorrecto');

		// 3. Lógica de Dispositivos (Solo si recordar es true)
		// Esto es un proceso secundario, no bloquea el login
		if (recordar) {
			await postControllerDispositivos(
				userId,
				fingerprint,
				nombreDispositivo,
				recordar
			);
		}

		// 4. Actualizar estado del usuario
		const usuarioAutorizado = await putControllerUsuario(
			{ userStatus: true },
			userId
		);

		// 5. GENERAR TOKEN (Siempre, porque ya pasó el 2FA)
		// Opcional: Puedes dar más tiempo de vida al token si 'recordar' es true
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

		// 6. Preparar respuesta
		// Nota: putControllerUsuario suele devolver un array, aseguramos tomar el primero
		const usuarioActualizadoData = Array.isArray(usuarioAutorizado)
			? usuarioAutorizado[0]
			: usuarioAutorizado;

		const usuarioSanitizado = await sanitizarUsuario(usuarioActualizadoData);
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
