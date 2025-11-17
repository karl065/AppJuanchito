import dotenv from 'dotenv';
dotenv.config();
import { createConnection } from 'mongoose';
const { DB } = process.env;

const mongoOptions = {
	maxPoolSize: 200,
	maxConnecting: 200,
};

// Crear la conexión utilizando createConnection
const connection = createConnection(DB, mongoOptions);

// Manejo de eventos de la conexión
connection.on('connected', () => {
	console.log('MongoDB Conectado');
});

connection.on('error', (error) => {
	console.error('Error de conexión MongoDB:', error);
});

export default connection;
