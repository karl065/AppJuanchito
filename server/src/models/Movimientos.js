import mongoose from 'mongoose';
import connection from './../config/DB.js';

const movimientosSchema = new mongoose.Schema({
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
		enum: ['entrada', 'salida', 'venta'],
	},
	producto: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Productos',
	},
	usuario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuarios',
	},
});

const Movimiento = connection.model('Movimiento', movimientosSchema);

export default Movimiento;
