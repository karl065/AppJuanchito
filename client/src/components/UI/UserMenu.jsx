import { Dropdown, DropdownItem, DropdownHeader, Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import {
	RiSettings3Line,
	RiLogoutBoxRLine,
	RiArrowDownSLine,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/admin/actions/logoutAction';

const UserMenu = () => {
	const login = useSelector((state) => state.login.login);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const usuarioLogin = login?.usuario || login;

	const handlerLogout = (e) => {
		e.preventDefault();
		logoutAction(usuarioLogin._id, { userStatus: false }, dispatch, navigate);
	};

	if (!login) return null;

	return (
		<div className="flex justify-end">
			<Dropdown
				label={
					<div className="flex items-center">
						<span className="font-extrabold uppercase bg-linear-to-r from-red-700 via-red-300 to-red-700 text-transparent bg-clip-text">
							{usuarioLogin.nombre}
						</span>
						<RiArrowDownSLine className="text-gray-300" />
					</div>
				}
				inline
				className="bg-linear-to-r from-red-900 via-red-950 to-black border-none rounded-2xl">
				<DropdownItem
					as={Link}
					to="/configuracion"
					icon={RiSettings3Line}
					className="rounded-2xl hover:bg-white">
					<span
						className="font-extrabold uppercase bg-linear-to-r 
                from-red-700 via-red-300 to-red-700 text-transparent bg-clip-text">
						Configuración
					</span>
				</DropdownItem>

				<DropdownItem icon={RiLogoutBoxRLine} className="rounded-2xl">
					<Button
						onClick={handlerLogout}
						className="bg-linear-to-r from-red-900 via-red-950 to-black border-none rounded-2xl">
						<span
							className="font-extrabold uppercase bg-linear-to-r 
                    from-red-700 via-red-300 to-red-700 text-transparent bg-clip-text">
							Salir
						</span>
					</Button>
				</DropdownItem>
			</Dropdown>
		</div>
	);
};

export default UserMenu;
