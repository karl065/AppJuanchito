import { useEffect, useMemo, useState } from 'react';
import Paginado from '../../../components/Paginado/Paginado.jsx';
import { usePaginacionResponsiva } from '../../../Hooks/usePaginacionResponsiva.jsx';
import { useSelector } from 'react-redux';
import Filtros from '../../../components/CabeceraFiltros/Filtros.jsx';
import MobileTable from '../../../components/MobileTable/MobileTable.jsx';
import { filtersConfigs } from '../../../helpers/filtersConfig.jsx';
import { mapMultiOpciones } from '../../../helpers/mapMultiOpciones.jsx';
import PerfilSuperior from '../../../components/PerfilSuperior/PerfilSuperior.jsx';

const Usuarios = () => {
	const usuarios = useSelector((state) => state.usuarios.usuarios);
	const roles = useSelector((state) => state.roles.roles);

	const [busqueda, setBusqueda] = useState('');

	// 1. Filtrado Específico de Usuarios
	const usuariosFiltrados = useMemo(() => {
		if (!usuarios) return [];
		const lowerCaseBusqueda = busqueda.toLowerCase();
		return usuarios.filter(
			(user) =>
				user.nombre.toLowerCase().includes(lowerCaseBusqueda) ||
				user.correo.toLowerCase().includes(lowerCaseBusqueda) ||
				user.role.toLowerCase().includes(lowerCaseBusqueda)
		);
	}, [usuarios, busqueda]);

	// 2. Hook de Paginación (Usando el helper local)
	const {
		paginatedData,
		currentPage,
		totalPages,
		goToPrevPage,
		goToNextPage,
		resetPage,
	} = usePaginacionResponsiva(usuariosFiltrados);

	// Resetear página al buscar
	useEffect(() => {
		resetPage();
	}, [busqueda, resetPage]);

	const rolesMap = roles.map((role, index) => ({
		id: index,
		nombre: role,
	}));

	const estadosOpciones = [
		{
			estadoRedux: rolesMap,
			key: 'id',
			label: 'nombre',
			value: 'nombre',
			nombre: 'Roles',
		},
	];

	const filtrosOpciones = mapMultiOpciones(estadosOpciones);

	const filtersConfig = filtersConfigs(filtrosOpciones, busqueda, setBusqueda);

	// Handlers
	const handleToggleStatus = (id) => {
		// En producción: dispatch(updateUserStatus({ id, status: !currentStatus }))
		console.log('Cambia Status: ', id);
	};

	const handleEdit = (row) => console.log('Editar Usuario', row.id);
	const handleDelete = (row) => console.log('Borrar Usuario', row.id);
	const handleAddUser = () => console.log('Crear Usuario');

	// 3. Definición de columnas y datos
	const tableData = paginatedData.map((user) => ({
		id: user._id,
		info: (
			<div className="flex flex-col text-left max-w-[150px] sm:max-w-full">
				<span className="font-bold text-white uppercase text-xs wrap-break-word leading-tight">
					{user.nombre}
				</span>
				<span className="text-[10px] text-gray-400 truncate mt-0.5">
					{user.correo}
				</span>
				<div className="mt-1">
					<span
						className={`text-[9px] px-1.5 py-0.5 rounded border ${
							user.role === 'Administrador'
								? 'border-purple-500 text-purple-400'
								: 'border-blue-500 text-blue-400'
						}`}>
						{user.role}
					</span>
				</div>
			</div>
		),
		estado: (
			<div className="flex flex-col items-end gap-1">
				<button
					onClick={() => handleToggleStatus(user._id)}
					className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-all active:scale-95 border cursor-pointer hover:opacity-80 ${
						user.userStatus
							? 'bg-green-900/30 text-green-400 border-green-800 hover:bg-green-900/50'
							: 'bg-red-900/30 text-red-400 border-red-800 hover:bg-red-900/50'
					}`}
					title={user.userStatus ? 'Desactivar' : 'Activar'}>
					<span
						className={`h-1.5 w-1.5 rounded-full ${
							user.userStatus ? 'bg-green-500' : 'bg-red-500'
						}`}></span>
					<span>{user.userStatus ? 'Activo' : 'Inactivo'}</span>
				</button>
				<span className="text-[10px] text-gray-400 font-mono tracking-wide">
					{user.celular}
				</span>
				{user.dispositivos?.length > 0 && (
					<span className="text-[9px] text-gray-500">
						{user.dispositivos.length} Disp.
					</span>
				)}
			</div>
		),
	}));

	const columns = [
		{ key: 'info', label: 'Usuario' },
		{ key: 'estado', label: 'Estado' },
	];

	return (
		<div className="flex flex-col h-full gap-3 p-2 ">
			{/* 🚨 NUEVO: Reemplazamos el espacio vacío con el Perfil Superior */}
			<PerfilSuperior />

			{/* Cabecera de Filtros Reutilizable */}
			<Filtros
				busqueda={busqueda}
				setBusqueda={setBusqueda}
				onAdd={handleAddUser}
				placeholder="Buscar por nombre o correo..."
				addButtonTitle="Crear nuevo usuario"
				extraControls={filtersConfig}
			/>

			{/* Tabla con scroll Reutilizable */}
			<div className="flex-1 min-h-0 overflow-y-auto pb-4">
				{tableData.length > 0 ? (
					<MobileTable
						columns={columns}
						data={tableData}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				) : (
					<div className="text-center text-gray-500 text-sm mt-8">
						{usuarios?.length === 0 ? 'No hay usuarios.' : 'Sin resultados.'}
					</div>
				)}
			</div>

			{/* Controles de Paginación Reutilizable */}
			<Paginado
				currentPage={currentPage}
				totalPages={totalPages}
				goToPrevPage={goToPrevPage}
				goToNextPage={goToNextPage}
			/>
		</div>
	);
};

export default Usuarios;
