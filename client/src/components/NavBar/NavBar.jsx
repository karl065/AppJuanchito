import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from '../UI/UserMenu.jsx';

const NavBar = () => {
	const login = useSelector((state) => state.login.login);
	const location = useLocation();

	if (!login) return null;

	// Quitamos "/" del inicio del path
	const cleanPath = location.pathname.replace(/^\//, '') || 'inicio';

	return (
		<div className="flex p-4">
			<nav className="w-full h-full grid grid-flow-col justify-items-stretch ">
				<div className="flex justify-center ">
					<h1
						className="text-base sm:text-3xl font-extrabold uppercase tracking-wide
			bg-linear-to-r from-red-700 via-red-300 to-red-700
			text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
			animate-[shine_3s_linear_infinite]">
						{cleanPath}
					</h1>
				</div>

				<div className="flex justify-self-end ">
					<UserMenu />
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
