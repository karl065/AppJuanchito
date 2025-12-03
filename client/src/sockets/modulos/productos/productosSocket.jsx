import { actualizarProducto } from '../../../redux/productos/slices/productosSlice.jsx';
import { getAppDispatch } from '../../../services/sockets/socketServices.jsx';

const productosSocketsListeners = (socket) => {
	const dispatch = getAppDispatch();

	if (!dispatch) {
		console.error('❌ No se ha configurado el dispatch para los sockets.');
		return;
	}

	// --- ESCUCHAR ACTUALIZACIONES ---
	// Este nombre 'productos:recargar_lista' debe coincidir EXACTAMENTE con el emit de tu backend
	socket.on('productos:recargar_lista', (productoActualizado) => {
		// Disparamos la acción de Redux para actualizar el store de ESTE cliente
		dispatch(actualizarProducto(productoActualizado));
	});

	// --- ESCUCHAR ELIMINACIONES ---
	socket.on('productos:item_eliminado', (idProducto) => {
		console.log('🗑️ Socket: Producto eliminado', idProducto);

		// Disparamos la acción de Redux para quitarlo de la lista
		// dispatch(eliminarProducto(idProducto));
	});
};

export default productosSocketsListeners;
