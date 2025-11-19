import mongoose from 'mongoose';
import connection from '../config/DB.js';

const categoriasSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
		required: false,
	},
	productos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Productos',
		},
	],
});

const Categorias = connection.model('Categorias', categoriasSchema);

export default Categorias;
