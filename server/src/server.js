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

server.use(cookieParser());
// ⚠️ Configura aquí los dominios permitidos
const allowedOrigins = [
	'http://localhost:5173',
	'http://192.168.101.10:5173',
	'http://192.168.101.5:5173',
	'capacitor://localhost',
	'http://localhost',
	'https://appjuanchitoserver.onrender.com',
	'https://f3a9d8a1.ngrok-free.app',
	"https://8824b071bf3e.ngrok-free.app/"
];

const io = new socketIO(httpServer, {
	cors: {
		origin: allowedOrigins, // Ajusta según tu configuración de React
		methods: ['GET', 'POST'],
		credentials: true
	},
}); // Crea una instancia de Socket.io

server.use(morgan('dev'));
server.use(express.json({ limit: '10mb' }));
server.use(express.urlencoded({ extended: true, limit: '10mb' }));
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
