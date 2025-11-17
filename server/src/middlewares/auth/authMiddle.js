import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { SECRETA } = process.env;

const authMiddle = async (req, res, next) => {
	try {
		const token = req.header('x-auth-token');
		if (!token) {
			return res.status(400).json({ msg: 'Token no valido' });
		}

		const decoded = verify(token, SECRETA);
		req.usuario = decoded.user;
		next();
	} catch (error) {
		return res.status(400).json({ msg: 'Token no valido' });
	}
};

export default { authMiddle };
