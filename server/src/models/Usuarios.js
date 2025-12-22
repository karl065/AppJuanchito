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
		movimientos: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Movimiento',
			},
		],
		facturas: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Factura',
			},
		],
		caja: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Caja',
			},
		],
		impresoras: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Impresoras',
			},
		],
	},
	{
		timestamps: false,
		autoCreate: false,
	}
);

const Usuarios = connection.model('Usuarios', usuarioSchema);

export default Usuarios;
