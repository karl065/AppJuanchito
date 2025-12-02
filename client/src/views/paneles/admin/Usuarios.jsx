import { useEffect, useMemo, useState } from 'react';
import Paginado from '../../../components/Paginado/Paginado.jsx';
import { usePaginacionResponsiva } from '../../../Hooks/usePaginacionResponsiva.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Filtros from '../../../components/CabeceraFiltros/Filtros.jsx';
import MobileTable from '../../../components/MobileTable/MobileTable.jsx';
import { filtersConfigs } from '../../../helpers/filtersConfig.jsx';
import { mapMultiOpciones } from '../../../helpers/mapMultiOpciones.jsx';
import PerfilSuperior from '../../../components/PerfilSuperior/PerfilSuperior.jsx';
import { alertSuccess, alertWarning } from '../../../helpers/alertas.jsx';
import { XIcon } from '../../../components/Icons/Icons.jsx';
import FormularioCrearUsuario from '../../formularios/generales/usuarios/CrearUsuarios.jsx';
import FormularioActualizarUsuario from '../../formularios/generales/usuarios/actualizarUsuarios.jsx';
import { actualizarUsuariosAction } from '../../../redux/admin/actions/actualizarUsuariosAction.jsx';
import { eliminarUsuarioAction } from '../../../redux/admin/actions/eliminarUsuarioAction.jsx';

const Usuarios = () => {
	const dispatch = useDispatch();
	const usuarios = useSelector((state) => state.usuarios.usuarios);
	const roles = useSelector((state) => state.roles.roles);

	const [busqueda, setBusqueda] = useState('');
	const [isModalCrearUsuarioOpen, setIsModalCrearUsuarioOpen] = useState(false);

	const [isModalActualizarUsuarioOpen, setIsModalActualizarUsuarioOpen] =
		useState(false);
	const [usuarioEditar, setUsuarioEditar] = useState(null);

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
	const handleToggleStatus = (id, userStatus) => {
		// En producción: dispatch(updateUserStatus({ id, status: !currentStatus }))
		actualizarUsuariosAction(dispatch, id, { userStatus: !userStatus });
	};

	const handleEdit = (user) => {
		setUsuarioEditar(user); // Guardamos usuario a editar
		setIsModalActualizarUsuarioOpen(true); // Abrimos modal
	};
	const handleDelete = async (row) => {
		const resp = await alertWarning('Esta seguro de eliminar este usuario?');
		if (resp) eliminarUsuarioAction(dispatch, row.id);
	};
	const handleAddUser = () => setIsModalCrearUsuarioOpen(true);

	const handleCloseCrearUsuarioModal = () => setIsModalCrearUsuarioOpen(false);
	const handleCloseActualizarUsuarioModal = () => {
		setIsModalActualizarUsuarioOpen(false);
		setUsuarioEditar(null);
	};

	const handleSuccessCreate = (nuevoUsuario) => {
		alertSuccess(`Usuario ${nuevoUsuario.nombre} creado con éxito.`);
		setIsModalCrearUsuarioOpen(false);
	};

	const handleSuccessUpdate = (usuarioActualizado) => {
		alertSuccess(`Usuario ${usuarioActualizado.nombre} actualizado con éxito.`);
		handleCloseActualizarUsuarioModal();
	};

	// 3. Definición de columnas y datos
	const tableData = paginatedData.map((user) => ({
		id: user._id,
		info: (
			<div className='flex flex-col text-left max-w-[150px] sm:max-w-full'>
				<span className='font-bold text-white uppercase text-xs wrap-break-word leading-tight'>
					{user.nombre}
				</span>
				<span className='text-[10px] text-gray-400 truncate mt-0.5'>
					{user.correo}
				</span>
				<div className='mt-1'>
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
			<div className='flex flex-col items-end gap-1'>
				<button
					onClick={() => handleToggleStatus(user._id, user.userStatus)}
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
				<span className='text-[10px] text-gray-400 font-mono tracking-wide'>
					{user.celular}
				</span>
				{user.dispositivos?.length > 0 && (
					<span className='text-[9px] text-gray-500'>
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
		<div className='flex flex-col h-full gap-3 p-2 '>
			{/* 🚨 NUEVO: Reemplazamos el espacio vacío con el Perfil Superior */}
			<PerfilSuperior />

			{/* Cabecera de Filtros Reutilizable */}
			<Filtros
				busqueda={busqueda}
				setBusqueda={setBusqueda}
				onAdd={handleAddUser}
				placeholder='Buscar por nombre o correo...'
				addButtonTitle='Crear nuevo usuario'
				extraControls={filtersConfig}
			/>

			{/* Tabla con scroll Reutilizable */}
			<div className='flex-1 min-h-0 overflow-y-auto pb-4'>
				{tableData.length > 0 ? (
					<MobileTable
						columns={columns}
						data={tableData}
						onEdit={(row) => {
							// Encontramos el usuario original basado en el ID
							const user = usuarios.find((u) => u._id === row.id);
							handleEdit(user);
						}}
						onDelete={handleDelete}
					/>
				) : (
					<div className='text-center text-gray-500 text-sm mt-8'>
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

			{/* MODAL DE CREACIÓN DE USUARIO */}
			{isModalCrearUsuarioOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm p-4 animate-fade-in'>
					<div className='bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] w-full max-w-sm rounded-xl border border-gray-700 shadow-2xl animate-fade-in-up relative'>
						<div className='flex justify-between items-center p-4 border-b border-gray-700'>
							<h3 className='text-lg font-bold text-white'>Nuevo Usuario</h3>
							<button
								onClick={handleCloseCrearUsuarioModal}
								className='p-1 rounded-full hover:bg-gray-700 transition-colors'>
								<XIcon className='w-5 h-5 text-gray-400 hover:text-white' />
							</button>
						</div>

						<div className='p-4'>
							<FormularioCrearUsuario
								onSuccess={handleSuccessCreate}
								onClose={handleCloseCrearUsuarioModal}
							/>
						</div>
					</div>
				</div>
			)}
			{/* MODAL DE ACTUALIZACIÓN */}
			{isModalActualizarUsuarioOpen && usuarioEditar && (
				<div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in'>
					<div className='bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] w-full max-w-sm rounded-xl border border-gray-700 shadow-2xl animate-fade-in-up relative'>
						<div className='flex justify-between items-center p-4 border-b border-gray-700'>
							<h3 className='text-lg font-bold text-white'>
								Actualizar Usuario
							</h3>
							<button
								onClick={handleCloseActualizarUsuarioModal}
								className='p-1 rounded-full hover:bg-gray-700 transition-colors'>
								<XIcon className='w-5 h-5 text-gray-400 hover:text-white' />
							</button>
						</div>
						<div className='p-4'>
							<FormularioActualizarUsuario
								userToEdit={usuarioEditar}
								onSuccess={handleSuccessUpdate}
								onClose={handleCloseActualizarUsuarioModal}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Usuarios;
