import { useSelector } from 'react-redux';

const Inventario = () => {
	const productos = useSelector((state) => state.productos.productos);

	console.log(productos);

	return (
		<div>
			<h1>Inventario</h1>
		</div>
	);
};

export default Inventario;
