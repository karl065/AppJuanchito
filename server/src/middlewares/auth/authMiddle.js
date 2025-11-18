import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { SECRETA } = process.env;

const authMiddle = async (req, res, next) => {
	try {
		const token = req.header('x-auth-token');
		if (!token) {
			return res.status(401).json({ msg: 'Token no valido' });
		}

		const decoded = verify(token, SECRETA);
		req.usuario = decoded;
		next();
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return res.status(401).json({ msg: 'Token expirado' });
		}

		return res.status(401).json({ msg: 'Token no valido' });
	}
};

export default authMiddle;
