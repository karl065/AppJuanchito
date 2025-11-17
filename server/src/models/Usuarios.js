import mongoose from 'mongoose';
import connection from '../config/DB.js';

const usuarioSchema = new mongoose.Schema(
	{
		nombre: String,
		correo: String,
		celular: Number,
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ['Administrador', 'Supervisor', 'Mesero'],
			required: true,
		},
		userStatus: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{
		timestamps: false,
		autoCreate: false,
	}
);

const Usuarios = connection.model('Usuarios', usuarioSchema);

export default Usuarios;
