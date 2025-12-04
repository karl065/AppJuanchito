import cajaListeners from './modulos/cajas/cajasSocket.jsx'; // Importa el nuevo listener
import facturasSocketsListeners from './modulos/facturas/facturasSockets.jsx';
import movimientosListeners from './modulos/movimientos/movimientosSockets.jsx';
import productosSocketsListeners from './modulos/productos/productosSocket.jsx';
import usuariosSocketsListeners from './modulos/usuarios/usuariosSockets.jsx';
// ... importa otros modulos ...

const registerClientModules = (socket) => {
	cajaListeners(socket);
	movimientosListeners(socket); // <-- Añade esta línea
	productosSocketsListeners(socket);
	usuariosSocketsListeners(socket);
	facturasSocketsListeners(socket);

	// ... registra otros modulos ...
};

export default registerClientModules;
