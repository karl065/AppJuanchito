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

		let decoded;

		try {
			decoded = jwt.verify(token, SECRETA);
			console.log(decoded);
		} catch (err) {
			if (err.name === 'TokenExpiredError') {
				await putControllerUsuario({ userStatus: false }, id);
				throw new Error('Token expirado');
			}
			await putControllerUsuario({ userStatus: false }, id);

			throw new Error('Token no válido');
		}

		req.usuario = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ msg: error.message });
	}
};

export default authMiddle;
