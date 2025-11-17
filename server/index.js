import dotenv from 'dotenv';
import { httpServer, io } from './src/server.js';
// import socket from './src/socket/socket.js';

dotenv.config();
const { PORT } = process.env;

// Pasa el servidor HTTP a listen en lugar del servidor Express
httpServer.listen(PORT, async () => {
	console.log(`Corriendo en el puerto: ${PORT}`);
});
// socket(io);
