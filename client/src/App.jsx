import './App.css';
import { Route, Routes } from 'react-router-dom';
import { allRoutes } from './routes/routes.jsx';
import { useSelector } from 'react-redux';
import LoginFull from './views/formularios/Login/LoginFull.jsx';

const App = () => {
	const login = useSelector((state) => state.login.login);

	const role = login?.usuario?.role || login?.role;
	const routesToRender = allRoutes[role] || [];

	return (
		<Routes>
			<Route path="/" element={<LoginFull />} />

			{routesToRender.map(({ path, element }, i) => (
				<Route key={i} path={path} element={element} />
			))}
		</Routes>
	);
};

export default App;
