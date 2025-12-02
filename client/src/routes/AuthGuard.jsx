// src/components/AuthGuard.jsx
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const AuthGuard = ({ children, isPrivate }) => {
	const login = useSelector((state) => state.login.login);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const role = login?.usuario?.role || login?.role;
		const currentPath = location.pathname;

		if (isPrivate && !login) {
			// Si es privada y no logueado, ve a login
			navigate('/');
		} else if (login) {
			// Si está logueado, revisa permisos específicos si es necesario
			if (role === 'Mesero' && currentPath === '/admin') {
				navigate('/caja'); // Mesero no puede ver admin
			}
			// Si está en login y ya logueado, navega a su vista por defecto
			if (currentPath === '/' || currentPath === '/login') {
				if (role === 'Mesero') navigate('/caja');
				else navigate('/admin');
			}
		}
	}, [login, isPrivate, navigate, location]);

	return children;
};

export default AuthGuard;
