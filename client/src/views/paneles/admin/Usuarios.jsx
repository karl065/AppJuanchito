import { useSelector } from 'react-redux';
import { Button, ToggleSwitch } from 'flowbite-react';
import MobileTable from '../../../components/MobileTable/MobileTable.jsx';

// Función para tomar solo primer nombre y primer apellido
const formatName = (fullName) => {
	if (!fullName) return '';
	const parts = fullName.split(' ');
	return `${parts[0]} ${parts[1] || ''}`.trim();
};

const Usuarios = () => {
	const usuarios = useSelector((state) => state.usuarios.usuarios);

	const tableData = usuarios?.map((user) => ({
		id: user._id,
		nombre: formatName(user.nombre),
		rol: user.role,

		// Aquí inyectamos el botón directamente
		estado: (
			<ToggleSwitch
				checked={user.userStatus}
				onChange={() => console.log('cambiar estado', user._id)}
			/>
		),
	}));

	const columns = [
		{ key: 'nombre', label: 'Nombre' },
		{ key: 'rol', label: 'Rol' },
		{ key: 'estado', label: 'Estado' },
	];

	return (
		<div className="p-2 flex items-center">
			<MobileTable columns={columns} data={tableData} />
		</div>
	);
};

export default Usuarios;
