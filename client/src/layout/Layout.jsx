import NavBar from '../components/NavBar/NavBar.jsx';
import Sidebar from '../components/sidebar/Sidebar.jsx';

const Layout = ({ children }) => {
	return (
		<div className="flex w-screen h-screen">
			<div className="flex flex-col flex-1 space-y-2 ">
				<NavBar />
				<div className="flex-1 ">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
