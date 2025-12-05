import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuarios from '../../../models/Usuarios.js';
import Dispositivos from '../../../models/DispositivosConfiables.js';

import dotenv from 'dotenv';
import sanitizarUsuario from '../../../helpers/sanitizadores/sanitizarUsuario.js';
import putControllerUsuario from './../putControllerUsuario.js';
dotenv.config();

const { SECRETA } = process.env;

const loginController = async ({ correo, password, fingerprint }) => {
	try {
		const usuario = await Usuarios.findOne({ correo }).populate('dispositivos');

		if (!usuario) throw new Error('Correo o contraseña incorrectos');

		if (usuario.userStatus)
			throw new Error('Usuario conectado, si no eres tu contacta con soporte');

		const passOk = await bcryptjs.compare(password, usuario.password);
		if (!passOk) throw new Error('Correo o contraseña incorrectos');

		// 1️⃣ Si el usuario NO tiene 2FA → forzar configuración
		if (!usuario.twoFactorEnabled) {
			return {
				require2FASetup: true,
				userId: usuario._id,
			};
		}

		// 2️⃣ Revisar si este dispositivo ya es confiable
		const confiable = await Dispositivos.findOne({
			userId: usuario._id,
			fingerprint,
		});

		const vigente = confiable && new Date(confiable.expiresAt) > new Date();
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

			const usuarioActivo = await putControllerUsuario(
				{ userStatus: true },
				usuario._id
			);

			return {
				loginApproved: true,
				require2FA: false,
				token: tokenSesion,
				usuario: usuarioActivo[0],
			};
		}

		// 3️⃣ Requiere código 2FA
		return {
			require2FA: true,
			userId: usuario._id,
			fingerprint,
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

export default loginController;
