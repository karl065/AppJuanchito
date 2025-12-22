import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import putControllerUsuario from '../../controllers/controllersUsuarios/putControllerUsuario.js';

dotenv.config();
const { SECRETA } = process.env;

const authMiddle = async (req, res, next) => {
	// 1. Obtener el token del Header
	const token = req.header('x-auth-token');

	console.log(token);

	// Buscamos el ID en query params por si acaso
	const { idUsuario } = req.query;

	if (!token) {
		return res.status(401).json({ msg: 'Permiso denegado, no hay token' });
	}

	try {
		// 2. Verificar el token
		const decoded = jwt.verify(token, SECRETA);

		req.usuario = decoded;

		next();
	} catch (error) {
		console.log('Error en token:', error.message);

		// --- Lógica de Respaldo para cerrar sesión (logout forzado en BD) ---
		let idParaCerrar = idUsuario;

		if (!idParaCerrar) {
			const decodedUnverified = jwt.decode(token);
			if (decodedUnverified?.id) {
				idParaCerrar = decodedUnverified.id;
			}
		}

		if (idParaCerrar) {
			try {
				// 1. Actualizamos la BD
				const usuarioDesconectado = await putControllerUsuario(
					{ userStatus: false },
					idParaCerrar
				);

				// 2. 🔥 SOCKET: Emitimos evento a todos los clientes
				// req.app.get('io') funciona si en tu index.js hiciste: app.set('io', io)
				const io = req.app.get('io');

				if (io) {
					// Normalizamos la respuesta por si putController devuelve array
					const payloadUsuario = Array.isArray(usuarioDesconectado)
						? usuarioDesconectado[0]
						: usuarioDesconectado;

					console.log(
						`Emitiendo socket usuario:desconectado para ID: ${idParaCerrar}`
					);

					// Emitimos el evento globalmente
					io.emit('usuario:desconectado', payloadUsuario);
				} else {
					console.log(
						'No se encontró instancia de Socket.io en req.app.get("io")'
					);
				}
			} catch (dbError) {
				console.log(
					'Error actualizando estado userStatus o emitiendo socket:',
					dbError.message
				);
			}
		}
		// ---------------------------------------------------------------------

		return res.status(401).json({ msg: 'Token no válido o expirado' });
	}
};

export default authMiddle;
