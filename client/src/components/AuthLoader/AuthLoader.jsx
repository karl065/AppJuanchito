/* eslint-disable react-hooks/exhaustive-deps */
// components/auth/AuthLoader.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reloginAction } from '../../redux/admin/actions/reloginAction.jsx';
import { obtenerUsuariosAction } from '../../redux/admin/actions/obtenerUsuariosAction.jsx';
import { obtenerProductosAction } from '../../redux/productos/actions/obtenerProductosAction.jsx';
import { obtenerCategoriasAction } from '../../redux/categorias/actions/obtenerCategoriasAction.jsx';
import { obtenerRolesAction } from '../../redux/admin/actions/obtenerRolesAction.jsx';
import { obtenerFacturasAction } from '../../redux/facturas/actions/obtenerFacturasAction.jsx';
import { obtenerMovimientosAction } from '../../redux/movimientos/actions/obtenerMovimientosAction.jsx';
import { obtenerCajasAction } from '../../redux/cajas/actions/obtenerCajasAction.jsx';

const AuthLoader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		obtenerProductosAction(dispatch);
		obtenerCategoriasAction(dispatch);
		obtenerUsuariosAction(dispatch);
		obtenerRolesAction(dispatch);
		obtenerFacturasAction(dispatch);
		obtenerMovimientosAction(dispatch);
		obtenerCajasAction(dispatch);

		reloginAction(dispatch, navigate);
	}, []);

	return null; // 👈 componente invisible
};

export default AuthLoader;
