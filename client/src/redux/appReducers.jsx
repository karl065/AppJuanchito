import { combineReducers } from '@reduxjs/toolkit';

// App Slices
import loadingReducer from './app/slices/loadingSlice.jsx';

// admin Slices
import loginReducer from './admin/slices/loginSlice.jsx';
import rolesReducer from './admin/slices/rolesSlice.jsx';
import usuariosReducer from './admin/slices/usuariosSlice.jsx';

// productos Slices
import productosReducer from './productos/slices/productosSlice.jsx';

// Categorias Slices
import categoriasReducer from './categorias/slices/categoriasSlice.jsx';

// facturas Slices
import facturasReducer from './facturas/slices/facturasSlices.jsx';

// movimientos Slices
import movimientosReducer from './movimientos/slices/movimientosSlices.jsx';

// cajas Slices
import cajasReducer from './cajas/slices/cajasSlices.jsx';

// impresoras Slices
import impresorasReducer from './impresoras/slices/impresorasSlices.jsx';

const appReducers = combineReducers({
	// App Reducers
	loading: loadingReducer,

	// admin reducers
	login: loginReducer,
	roles: rolesReducer,
	usuarios: usuariosReducer,

	// Categorias reducers
	categorias: categoriasReducer,

	// productos reducers
	productos: productosReducer,

	// facturas reducers
	facturas: facturasReducer,

	// movimientos reducers
	movimientos: movimientosReducer,

	// cajas reducers
	cajas: cajasReducer,

	// impresoras reducers
	impresoras: impresorasReducer,
});

export default appReducers;
