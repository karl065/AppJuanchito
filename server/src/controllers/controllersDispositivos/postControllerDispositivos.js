import jwt from 'jsonwebtoken';
import Dispositivos from '../../models/DispositivosConfiables.js';
import Usuarios from '../../models/Usuarios.js';
import dotenv from 'dotenv';
dotenv.config();

const { SECRETA } = process.env;

const postControllerDispositivos = async (
	userId,
	fingerprint,
	nombreDispositivo,
	recordar
) => {
	// Token del dispositivo generado con JWT
	const deviceToken = jwt.sign({ userId, fingerprint }, SECRETA, {
		expiresIn: '30d',
	});

	// Fecha de expiración para control adicional
	const expiresAt = new Date();
	expiresAt.setDate(expiresAt.getDate() + 30);

	// Crear dispositivo confiable
	const nuevo = await Dispositivos.create({
		userId,
		fingerprint,
		deviceToken,
		expiresAt,
		nombreDispositivo,
		confiable: recordar,
	});

	// Asociarlo al usuario
	await Usuarios.findByIdAndUpdate(userId, {
		$push: { dispositivos: nuevo._id },
	});

	return nuevo;
};

export default postControllerDispositivos;
