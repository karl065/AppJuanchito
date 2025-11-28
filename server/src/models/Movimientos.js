import mongoose from 'mongoose';
import connection from './../config/DB.js';

const movimientosSchema = new mongoose.Schema(
	{
		entrada: {
			type: Number,
		},
		salida: {
			type: Number,
		},
		descripcion: {
			type: String,
		},
		tipo: {
			type: String,
			enum: [
				'entrada',
				'salida',
				'venta',
				'cortesía',
				'préstamo_salida',
				'préstamo_entrada',
				'devolución_entrada',
				'devolución_salida',
			],
		},
		producto: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Productos',
		},
		usuario: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Usuarios',
		},
	},
	{ timestamps: true }
);

const Movimiento = connection.model('Movimiento', movimientosSchema);

export default Movimiento;
