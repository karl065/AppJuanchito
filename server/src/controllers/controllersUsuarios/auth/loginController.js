import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuarios from '../../../models/Usuarios.js';
import dotenv from 'dotenv';
import putControllerUsuario from './../putControllerUsuario.js';
dotenv.config();

const { SECRETA } = process.env;

// Eliminamos 'fingerprint' de los argumentos
const loginController = async ({ correo, password }) => {
	try {
		const usuario = await Usuarios.findOne({ correo })
			// Se eliminó .populate('dispositivos')
			.populate('movimientos')
			.populate('facturas')
			.populate({
				path: 'caja',
				populate: {
					path: 'facturas',
				},
			});

		if (!usuario) throw new Error('Correo o contraseña incorrectos');

		if (usuario.userStatus)
			throw new Error('Usuario conectado, si no eres tu contacta con soporte');

		const passOk = await bcryptjs.compare(password, usuario.password);
		if (!passOk) throw new Error('Correo o contraseña incorrectos');

		// --- INICIO LOGIN DIRECTO ---

		// 1. Generar token de sesión (JWT)
		const tokenSesion = jwt.sign(
			{
				id: usuario._id,
				role: usuario.role,
				correo: usuario.correo,
			},
			SECRETA,
			{ expiresIn: '7d' }
		);

		// 2. Actualizar estado del usuario a conectado
		const usuarioActivo = await putControllerUsuario(
			{ userStatus: true },
			usuario._id
		);

		// 3. Retornar datos (Token + Usuario)
		return {
			token: tokenSesion,
			usuario: Array.isArray(usuarioActivo) ? usuarioActivo[0] : usuarioActivo,
		};
	} catch (error) {
		throw new Error(error.message);
	}
};

export default loginController;
