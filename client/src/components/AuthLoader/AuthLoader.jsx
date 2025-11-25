/* eslint-disable react-hooks/exhaustive-deps */
// components/auth/AuthLoader.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reloginAction } from '../../redux/admin/actions/reloginAction.jsx';
import { obtenerUsuariosAction } from '../../redux/admin/actions/obtenerUsuariosAction.jsx';
import { obtenerProductosAction } from '../../redux/productos/actions/obtenerProductosAction.jsx';
import { obtenerCategoriasAction } from '../../redux/categorias/actions/obtenerCategoriasAction.jsx';

const AuthLoader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		obtenerProductosAction(dispatch);
		obtenerCategoriasAction(dispatch);
		obtenerUsuariosAction(dispatch);
		reloginAction(dispatch, navigate);
	}, []);

	return null; // 👈 componente invisible
};

export default AuthLoader;
