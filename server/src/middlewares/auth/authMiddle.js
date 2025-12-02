import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { SECRETA } = process.env;

const authMiddle = async (req, res, next) => {
	try {
		const token = req.cookies.token; // viene de cookie httpOnly

		if (!token) throw new Error('Token no válido');

		let decoded;

		try {
			decoded = jwt.verify(token, SECRETA);
		} catch (err) {
			res.clearCookie('token');
			if (err.name === 'TokenExpiredError') {
				throw new Error('Token expirado');
			}

			throw new Error('Token no válido');
		}

		req.usuario = decoded;
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ msg: error.message });
	}
};

export default authMiddle;
