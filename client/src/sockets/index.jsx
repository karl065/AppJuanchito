import cajaListeners from './modulos/cajas/cajasSocket.jsx'; // Importa el nuevo listener
import movimientosListeners from './modulos/movimientos/movimientosSockets.jsx';
// ... importa otros modulos ...

const registerClientModules = (socket) => {
	cajaListeners(socket);
	movimientosListeners(socket); // <-- Añade esta línea
	// ... registra otros modulos ...
};

export default registerClientModules;
