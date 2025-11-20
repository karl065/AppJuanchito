import mongoose from 'mongoose';
import connection from './../config/DB.js';

const CajaSchema = new mongoose.Schema(
	{
		// Usuario que abrió la caja
		usuario: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Usuarios',
			required: true,
		},

		// Estado de la caja
		estado: {
			type: String,
			enum: ['abierta', 'cerrada'],
			default: 'abierta',
		},

		// Subdocumento: apertura de caja
		apertura: {
			horaApertura: {
				type: Date,
				default: Date.now,
			},
			baseInicial: {
				type: Number,
				required: true,
				default: 0,
			},
		},

		// Totales acumulados (actualizados en tiempo real)
		totalEfectivo: {
			type: Number,
			default: 0,
		},
		totalNequi: {
			type: Number,
			default: 0,
		},
		totalDaviplata: {
			type: Number,
			default: 0,
		},

		totalVentas: {
			type: Number,
			default: 0,
		},

		// Subdocumento: cierre de caja (un snapshot simple)
		cierre: {
			horaCierre: Date,
			totalFinal: Number,
		},
		facturas: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Factura',
			},
		],
	},
	{ timestamps: true }
);

const Caja = connection.model('Caja', CajaSchema);
export default Caja;
