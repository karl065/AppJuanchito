import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../redux/admin/actions/logoutAction.jsx';
import { Avatar, Button, DropdownDivider } from 'flowbite-react';
import { LogoutIcon } from '../Icons/Icons.jsx';

const PerfilSuperior = () => {
	const login = useSelector((state) => state.login.login);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	if (!login) return null;
	const usuarioLogin = login?.usuario || login;

	const handlerLogout = (e) => {
		e.preventDefault();
		logoutAction(usuarioLogin._id, { userStatus: false }, dispatch, navigate);
	};

	return (
		<div className="flex flex-col p-3 rounded-xl shadow-2xl  mb-4">
			{/* CONTENEDOR PRINCIPAL: ALINEACIÓN LATERAL (Avatar/Datos vs Botón) */}
			<div className="flex items-center justify-between w-full">
				{/* 1. AVATAR Y DATOS */}
				<div className="flex items-center gap-3">
					<Avatar
						alt="Perfil"
						img="https://res.cloudinary.com/dpjeltekx/image/upload/v1763975684/juanchito/logoBlancoCuadro_gz5fwi.png"
						rounded
					/>
					<div className="flex flex-col justify-center min-w-0">
						{/* Reducimos el tamaño de la fuente para más compactación */}
						<span
							className="text-sm font-bold tracking-wide truncate text-transparent bg-clip-text 
                            bg-linear-to-r from-red-500 via-red-300 to-red-500 drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]">
							{usuarioLogin.nombre}
						</span>
						{/* Dejamos solo el rol, eliminando el correo para máxima compactación */}
						<span className="text-[10px] text-yellow-400 mt-0.5 uppercase font-semibold">
							{usuarioLogin.role}
						</span>
					</div>
				</div>

				{/* 2. BOTÓN DE CERRAR SESIÓN (Redondo con Icono) */}
				<Button
					onClick={handlerLogout}
					title="Cerrar Sesión"
					className="w-10 h-10 p-0 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-600 shadow-md shadow-red-900/50 active:scale-90 transition-all shrink-0">
					<LogoutIcon className="w-5 h-5 text-white" />
				</Button>
			</div>
		</div>
	);
};

export default PerfilSuperior;
