import express from 'express';
import http from 'http';
import { Server as socketIO } from 'socket.io';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

const server = express();
const httpServer = http.createServer(server); // Crea un servidor HTTP

// ⚠️ Configura aquí los dominios permitidos
const allowedOrigins = [
	// 'https://tu-dominio-oficial.com', // PRODUCCIÓN
	'capacitor://localhost', // App móvil
	'http://localhost:5173', // DEV
	'http://127.0.0.1:5173', // DEV
];

const io = new socketIO(httpServer, {
	cors: {
		origin: allowedOrigins, // Ajusta según tu configuración de React
		methods: ['GET', 'POST'],
	},
}); // Crea una instancia de Socket.io

server.use(morgan('dev'));
server.use(express.json());
server.use(cookieParser());
server.use(helmet());

// Cross-Origin-Opener-Policy configuration
server.use(
	helmet.crossOriginOpenerPolicy({
		policy: 'same-origin-allow-popups',
	})
);

// CORS seguro: permite cookies entre front y back
server.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true); // Postman / mobile requests
			if (allowedOrigins.includes(origin)) return callback(null, true);
			return callback(new Error('Not allowed by CORS'));
		},
		credentials: true,
	})
);

server.use(router);

export { server, httpServer, io };
