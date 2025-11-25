/* eslint-disable react-hooks/exhaustive-deps */
// components/auth/AuthLoader.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reloginAction } from '../redux/admin/actions/reloginAction.jsx';
import { useNavigate } from 'react-router-dom';
import { obtenerUsuariosAction } from '../redux/admin/actions/obtenerUsuariosAction.jsx';

const AuthLoader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		reloginAction(dispatch, navigate);
		obtenerUsuariosAction(dispatch);
	}, []);

	return null; // 👈 componente invisible
};

export default AuthLoader;
