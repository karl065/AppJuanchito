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

		// Estado: abierta o cerrada por el cajero
		estado: {
			type: String,
			enum: ['abierta', 'cerrada', "verificada"],
			default: 'abierta',
		},

		// Subdocumento: apertura
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

		// Totales acumulados en tiempo real por ventas
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

		// Cierre hecho por el cajero
		cierre: {
			horaCierre: Date,
			conteoFisico: Number, // dinero real contado en caja
			traspasoDigital: Number, // valor recibido por nequi/davi en cierre
			totalSistema: Number, // suma de totales según sistema
			diferencia: Number, // conteo - sistema
			verificado: {
				type: Boolean,
				default: false,
			},
		},

		// Resultado cuando el supervisor revisa
		resultadoCierre: {
			estado: {
				type: String,
				enum: ['ok', 'descuadre'],
			},
			verificadoPor: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Usuarios',
			},
			notas: String,
		},

		// Facturas asociadas a la caja
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
