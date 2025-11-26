import NavBar from '../components/NavBar/Navbar.jsx';

const Layout = ({ children }) => {
	return (
		<div className="flex w-screen h-screen overflow-hidden">
			<div className="flex flex-col flex-1 space-y-2 ">
				<NavBar />
				<div className="flex-1 ">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
