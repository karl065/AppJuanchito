import './App.css';
import { Route, Routes } from 'react-router-dom';
import { allRoutes } from './routes/routes.jsx';
import { useSelector } from 'react-redux';
import LoginForm from './views/formularios/Login/Login.jsx';

const App = () => {
	const login = useSelector((state) => state.login.login);

	const routesToRender = allRoutes[login.role] || [];

	return (
		<Routes>
			<Route path="/" element={<LoginForm />} />

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
