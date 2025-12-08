/* eslint-disable react-hooks/exhaustive-deps */
// components/auth/AuthLoader.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reloginAction } from '../../redux/admin/actions/reloginAction.jsx';
import { obtenerUsuariosAction } from '../../redux/admin/actions/obtenerUsuariosAction.jsx';
import { obtenerProductosAction } from '../../redux/productos/actions/obtenerProductosAction.jsx';
import { obtenerCategoriasAction } from '../../redux/categorias/actions/obtenerCategoriasAction.jsx';
import { obtenerRolesAction } from '../../redux/admin/actions/obtenerRolesAction.jsx';
import { obtenerFacturasAction } from '../../redux/facturas/actions/obtenerFacturasAction.jsx';
import { obtenerMovimientosAction } from '../../redux/movimientos/actions/obtenerMovimientosAction.jsx';
import { obtenerCajasAction } from '../../redux/cajas/actions/obtenerCajasAction.jsx';
import { obtenerTiposMovimientosAction } from '../../redux/movimientos/actions/obtenerTiposMovimientosAction.jsx';
import { obtenerImpresorasAction } from '../../redux/impresoras/actions/obtenerImpresorasAction.jsx';
import { obtenerEstadosCierreAction } from '../../redux/cajas/actions/obtenerEstadosCierre.jsx';
import {
	connectSocket,
	setAppDispatch,
} from '../../services/sockets/socketServices.jsx';

const AuthLoader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const login = useSelector((state) => state.login.login);

	useEffect(() => {
		connectSocket();
		setAppDispatch(dispatch);
		reloginAction(dispatch, navigate);
		obtenerUsuariosAction(dispatch);
	}, []);

	useEffect(() => {
		if (login.role === 'Mesero') {
			obtenerImpresorasAction(dispatch);
			obtenerProductosAction(dispatch);
			obtenerCategoriasAction(dispatch);
			obtenerCajasAction(dispatch);
		} else if (login.role === 'Administrador' || login.role === 'Supervisor') {
			obtenerImpresorasAction(dispatch);
			obtenerProductosAction(dispatch);
			obtenerCategoriasAction(dispatch);
			obtenerFacturasAction(dispatch);
			obtenerRolesAction(dispatch);
			obtenerMovimientosAction(dispatch);
			obtenerCajasAction(dispatch);
			obtenerTiposMovimientosAction(dispatch);
			obtenerEstadosCierreAction(dispatch);
		}
	}, [login]);

	return null; // 👈 componente invisible
};

export default AuthLoader;
