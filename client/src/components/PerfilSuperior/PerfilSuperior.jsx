import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button } from 'flowbite-react';
import { AdminIcon, LogoutIcon, StoreIcon } from '../Icons/Icons.jsx';
import { useState } from 'react';
import ModalCierreCaja from '../../views/paneles/admin/ModalCierreCaja.jsx';
import { logoutAction } from '../../redux/admin/actions/logoutAction.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { crearCajasAction } from '../../redux/cajas/actions/crearCajasAction.jsx';
import AperturaCaja from '../../views/formularios/shared/AperturaCaja.jsx';

const PerfilSuperior = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const login = useSelector((state) => state.login.login);
	const cajaActual = useSelector((state) => state.cajas.cajaActual);

	const path = location.pathname;

	const [showModalCierre, setShowModalCierre] = useState(false);
	const [showAperturaCaja, setShowAperturaCaja] = useState(false); // Estado para el modal de apertura

	if (!login) return null;
	const usuarioLogin = login?.usuario || login;
	const esAdminOSupervisor =
		usuarioLogin.role === 'Administrador' || usuarioLogin.role === 'Supervisor';
	const cajaEstaAbierta = !cajaActual.estado && cajaActual.estado === 'abierta';

	const handleAbrirCaja = async (nuevaCaja) => {
		await crearCajasAction(dispatch, nuevaCaja);
		setShowAperturaCaja(false); // Cerrar modal después de abrir la caja
	};

	const handlerAbrirYCerrarVista = (e) => {
		e.preventDefault();

		if (esAdminOSupervisor) {
			if (!cajaEstaAbierta) {
				// Si no hay caja abierta, muestra el modal de apertura
				setShowAperturaCaja(true);
			} else {
				// Si la caja está abierta, navega basado en la RUTA ACTUAL
				if (path === '/admin') {
					navigate('/caja');
				} else if (path === '/caja') {
					navigate('/admin');
				}
			}
		}
	};

	// Función para manejar el cierre de caja (abre el modal de cierre)
	const handlerCerrarCaja = (e) => {
		e.preventDefault();
		if (cajaEstaAbierta) {
			setShowModalCierre(true);
		} else {
			// Si no hay caja abierta, simplemente desloguea
			handlerLogout(e);
		}
	};

	// Función de logout estándar
	const handlerLogout = (e) => {
		e.preventDefault();
		logoutAction(usuarioLogin._id, { userStatus: false }, dispatch, navigate);
	};

	return (
		<div className='flex flex-col p-3 rounded-xl shadow-2xl mb-4'>
			<div className='flex items-center justify-between w-full'>
				{/* 1. AVATAR Y DATOS (sin cambios) */}
				<div className='flex items-center gap-3'>
					<Avatar
						alt='Perfil'
						img='https://res.cloudinary.com/dpjeltekx/image/upload/v1763975684/juanchito/logoBlancoCuadro_gz5fwi.png'
						rounded
					/>
					<div className='flex flex-col justify-center min-w-0'>
						<span className='text-sm font-bold tracking-wide truncate text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-300 to-red-500 drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]'>
							{usuarioLogin.nombre}
						</span>
						<span className='text-[10px] text-yellow-400 mt-0.5 uppercase font-semibold'>
							{usuarioLogin.role}
						</span>
					</div>
				</div>

				{/* 2. BOTONES DE ACCIÓN */}
				<div className='flex gap-3'>
					{/* Botón de abrir/cambiar vista (solo Admin/Supervisor) */}
					{esAdminOSupervisor && (
						<Button
							onClick={handlerAbrirYCerrarVista}
							title={cajaEstaAbierta ? 'Cambiar Vista' : 'Abrir Caja'}
							className='w-10 h-10 p-0 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-600 shadow-md shadow-red-900/50 active:scale-90 transition-all shrink-0'>
							{/* Icono: Basamos la lógica en la RUTA ACTUAL */}
							{cajaEstaAbierta ? (
								path === '/admin' ? (
									<StoreIcon className='w-5 h-5 text-white' /> // Muestra icono de tienda para ir a caja
								) : (
									<AdminIcon className='w-5 h-5 text-white' /> // Muestra icono de admin para ir a admin
								)
							) : (
								// Si no está abierta, mostramos icono de Admin (acción: abrir caja)
								<AdminIcon className='w-5 h-5 text-white' />
							)}
						</Button>
					)}

					{/* Botón de Cerrar Sesión / Cerrar Caja (Meseros usan este para todo) */}
					<Button
						onClick={handlerCerrarCaja} // Usamos el nuevo handler para decidir si abrir modal o logout
						title={cajaEstaAbierta ? 'Cerrar Caja' : 'Cerrar Sesión'}
						className='w-10 h-10 p-0 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-600 shadow-md shadow-red-900/50 active:scale-90 transition-all shrink-0'>
						<LogoutIcon className='w-5 h-5 text-white' />
					</Button>
				</div>
			</div>
			{/* MODALES */}
			{showModalCierre && (
				<ModalCierreCaja onClose={() => setShowModalCierre(false)} />
			)}
			{showAperturaCaja && (
				<AperturaCaja
					usuario={login}
					onAbrirCaja={handleAbrirCaja}
					onClose={() => setShowAperturaCaja(false)}
				/>
			)}
		</div>
	);
};

export default PerfilSuperior;
