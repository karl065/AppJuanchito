import registerSocketModules from './index.js';

const socket = (ioInstance) => {
	// Llama a la función principal de registro, pasando la instancia de IO
	registerSocketModules(ioInstance);
	console.log('🟢 Listeners de Socket.io registrados.');
};

export default socket;
