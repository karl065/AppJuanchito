import './App.css';
import { Route, Routes } from 'react-router-dom';
import { allRoutes } from './routes/routes.jsx';
import { useSelector } from 'react-redux';
import LoginForm from './views/formularios/Login/Login.jsx';

const App = () => {
	const login = useSelector((state) => state.login.login);

	const role = login?.usuario?.role || login?.role;
	const routesToRender = allRoutes[role] || [];

	return (
		<Routes>
			<Route path='/' element={<LoginForm />} />

			{routesToRender.map(({ path, element }, i) => (
				<Route key={i} path={path} element={element} />
			))}
		</Routes>
	);
};

export default App;
