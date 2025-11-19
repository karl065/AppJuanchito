import Productos from '../../models/Productos.js';
import Usuarios from '../../models/Usuarios.js';

const actualizarStockProducto = async (movimiento) => {
	const producto = await Productos.findById(movimiento.producto);
	const usuario = await Usuarios.findById(movimiento.usuario);
	if (!producto) throw new Error('Producto no encontrado');

	const nuevoStock =
		(producto.stock || 0) +
		(movimiento.entrada || 0) -
		(movimiento.salida || 0);

	producto.stock = nuevoStock;
	producto.movimientos = producto.movimientos || [];
	producto.movimientos.push(movimiento._id);
	usuario.movimientos.push(movimiento._id);

	await producto.save();
	await usuario.save();

	return producto;
};

export default actualizarStockProducto;
