import mongoose from 'mongoose';
import connection from '../config/DB.js';

const productosSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
	},
	precio: {
		type: Number,
		required: true,
	},
	descripcion: {
		type: String,
		required: false,
	},
	categoria: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Categorias',
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	unidadMedida: {
		type: String,
		required: true,
	},
	estado: {
		type: String,
		enum: ['disponible', 'agotado', 'descontinuado'],
		default: 'disponible',
	},
});

const Productos = connection.model('Productos', productosSchema);
export default Productos;
