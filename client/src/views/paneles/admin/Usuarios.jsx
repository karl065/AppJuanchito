import { useSelector } from 'react-redux';

const Usuarios = () => {
	const usuarios = useSelector((state) => state.usuarios.usuarios);

	console.log(usuarios);

	return (
		<div>
			<h1>usuarios</h1>
		</div>
	);
};

export default Usuarios;
