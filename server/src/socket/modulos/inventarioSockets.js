const productosSockets = (io, socket) => {
	// ...

	socket.on('producto:actualizado', (productoData) => {
		// 👉 USA ESTO: Notifica a TODOS EXCEPTO al emisor.
		socket.broadcast.emit('productos:recargar_lista', productoData);
	});

	socket.on('producto:creado', (productData) => {
		socket.broadcast.emit('productos:agregar_producto', productData);
	});

	socket.on('producto:eliminado', (productoId) => {
		// 👉 USA ESTO: Notifica a TODOS EXCEPTO al emisor.
		socket.broadcast.emit('productos:item_eliminado', productoId);
	});
};

export default productosSockets;
