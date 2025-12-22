import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import putControllerUsuario from '../../controllers/controllersUsuarios/putControllerUsuario.js';
dotenv.config();
const { SECRETA } = process.env;

const authMiddle = async (req, res, next) => {
	try {
		const token = req.cookies.token; // viene de cookie httpOnly
		const { id } = req.query;

		console.log('Token ', token);

		if (!token) {
			throw new Error('No hay token');
		}

		// 2. Verificamos el token (Plan A - Camino Feliz)
		const decoded = jwt.verify(token, SECRETA);

		req.usuario = decoded;
		next();
	} catch (err) {
		console.log('Error en AuthMiddle:', err.message);

		// Si no tenemos ID del query param, intentamos sacarlo del token expirado
		if (!id) {
			const decodedUnverified = jwt.decode(req.cookies?.token);
			if (decodedUnverified?.id) {
				id = decodedUnverified.id;
			}
		}

		// 3. Ejecutamos la actualización de estado si conseguimos un ID
		if (id) {
			console.log(`Cerrando sesión en DB para usuario ID: ${id}`);
			try {
				await putControllerUsuario({ userStatus: false }, id);
			} catch (dbError) {
				console.log('Error al actualizar estado de usuario:', dbError.message);
			}
		}

		if (err.name === 'TokenExpiredError') {
			return res.status(401).json({ msg: 'Token expirado' });
		}

		return res.status(401).json({ msg: 'Token no válido' });
	}
};

export default authMiddle;
