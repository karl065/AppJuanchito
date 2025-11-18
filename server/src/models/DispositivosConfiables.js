import mongoose from 'mongoose';
import connection from '../config/DB.js';

const dispositivosSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Usuarios',
			required: true,
		},

		// Token único que identifica el dispositivo
		deviceToken: {
			type: String,
			required: true,
			unique: true,
		},

		// Huella digital del dispositivo
		fingerprint: {
			type: String,
			required: true,
		},

		// Si el usuario marcó "Confiar en este dispositivo"
		trusted: {
			type: Boolean,
			default: true,
		},

		// Fecha de expiración (ej: 60 días)
		expiresAt: {
			type: Date,
			required: true,
		},
		nombreDispositivo: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const Dispositivos = connection.model('Dispositivos', dispositivosSchema);

export default Dispositivos;
