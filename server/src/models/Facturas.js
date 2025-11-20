import mongoose from 'mongoose';
import connection from './../config/DB.js';

const facturaSchema = new mongoose.Schema(
	{
		metodoPago: {
			type: String,
			enum: ['efectivo', 'daviplata', 'nequi', 'mixto'],
			required: true,
		},

		detallePago: {
			efectivo: { type: Number, default: 0 },
			daviplata: { type: Number, default: 0 },
			nequi: { type: Number, default: 0 },
			totalPagado: { type: Number, required: true },
			cambio: { type: Number, default: 0 },
		},

		usuario: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Usuarios',
			required: true,
		},

		caja: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Caja',
			required: true,
		},

		productos: [
			{
				producto: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Productos',
					required: true,
				},
				cantidad: {
					type: Number,
					required: true,
				},
				precioUnitario: {
					type: Number,
					required: true,
				},
				precioTotalProducto: {
					type: Number,
					required: true,
				},
			},
		],

		precioVenta: {
			type: Number,
			required: true,
		},

		movimientos: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Movimiento',
			},
		],

		observaciones: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Factura = connection.model('Factura', facturaSchema);

export default Factura;
