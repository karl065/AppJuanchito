import {
	Avatar,
	Button,
	Dropdown,
	DropdownDivider,
	DropdownHeader,
	DropdownItem,
	Navbar,
	NavbarBrand,
} from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ItemsMenu from '../Menu/ItemsMenu.jsx';
import { logoutAction } from '../../redux/admin/actions/logoutAction.jsx';

const NavBar = () => {
	const location = useLocation();
	const login = useSelector((state) => state.login.login);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handlerLogout = (e) => {
		e.preventDefault();
		logoutAction(usuarioLogin._id, { userStatus: false }, dispatch, navigate);
	};

	if (!login) return null;
	const usuarioLogin = login?.usuario || login;

	const cleanPath = location.pathname.replace(/^\//, '') || 'inicio';

	return (
		<Navbar
			fluid
			rounded
			className=" bg-[linear-gradient(60deg,#2b0000_0%,#0a0000_50%,#000000_100%)] ">
			<div className="flex  w-full space-x-2">
				<Dropdown
					arrowIcon={false}
					inline
					label={
						<Avatar
							alt="Menu"
							img="https://res.cloudinary.com/dpjeltekx/image/upload/v1763975684/juanchito/logoBlancoCuadro_gz5fwi.png"
							rounded
						/>
					}
					className="bg-[linear-gradient(180deg,#2b0000_0%,#0a0000_50%,#000000_100%)] border-none ">
					<DropdownHeader>
						<span
							className="block text-sm sm:text-lg font-bold tracking-wide
                            bg-linear-to-r from-red-700 via-red-300 to-red-700
                            text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
                            animate-[shine_3s_linear_infinite]">
							{usuarioLogin.nombre}
						</span>
						<span
							className="block truncate text-xs sm:text-base font-bold tracking-wide
                            bg-linear-to-r from-red-700 via-red-300 to-red-700
                            text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
                            animate-[shine_3s_linear_infinite]">
							{usuarioLogin.correo}
						</span>
					</DropdownHeader>
					<DropdownDivider />
					{ItemsMenu.map((item, index) => (
						<div key={index}>
							{item.separator && <DropdownDivider />}
							<DropdownItem
								className="bg-transparent rounded border-none hover:bg-black! focus:bg-black! active:bg-black!"
								as={Link}
								href={item.route}>
								<span
									className="block text-sm sm:text-lg font-bold tracking-wide
                                    bg-linear-to-r from-red-700 via-red-300 to-red-700
                                    text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
                                    animate-[shine_3s_linear_infinite]">
									{item.label}
								</span>
							</DropdownItem>
						</div>
					))}
					<DropdownDivider />
					<DropdownItem className="rounded">
						<Button onClick={handlerLogout} className="bg-transparent">
							<span
								className="block text-sm sm:text-lg font-bold tracking-wide
                                    bg-linear-to-r from-red-700 via-red-300 to-red-700
                                    text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
                                    animate-[shine_3s_linear_infinite]">
								Salir
							</span>
						</Button>
					</DropdownItem>
				</Dropdown>
				<div className="flex items-center justify-center w-full">
					<NavbarBrand>
						<span
							className="text-base sm:text-3xl font-extrabold uppercase tracking-wide
                            bg-linear-to-r from-red-700 via-red-300 to-red-700
                            text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
                            animate-[shine_3s_linear_infinite]">
							{cleanPath}
						</span>
					</NavbarBrand>
				</div>
			</div>
		</Navbar>
	);
};

export default NavBar;
