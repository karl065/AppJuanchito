import './App.css';
import { Route, Routes } from 'react-router-dom';
import { allRoutes } from './routes/routes.jsx';
import { useSelector } from 'react-redux';
import LoginFull from './views/formularios/Login/LoginFull.jsx';

const App = () => {
	const login = useSelector((state) => state.login.login);

	const routesToRender = allRoutes[login.role] || [];

	return (
		<Routes>
			<Route path="/" element={<LoginFull />} />

			{routesToRender.map(({ path, element, layout: Layout }, i) => (
				<Route
					key={i}
					path={path}
					element={Layout ? <Layout>{element}</Layout> : element}
				/>
			))}
		</Routes>
	);
};

export default App;
