import { combineReducers } from '@reduxjs/toolkit';

// App Slices
import loadingReducer from './app/slices/loadingSlice.jsx';

// admin Slices
import loginReducer from './admin/slices/loginSlice.jsx';
import rolesReducer from './admin/slices/rolesSlice.jsx';
import usuariosReducer from './admin/slices/usuariosSlice.jsx';

const appReducers = combineReducers({
	// App Reducers
	loading: loadingReducer,

	// admin reducers
	login: loginReducer,
	roles: rolesReducer,
	usuarios: usuariosReducer,
});

export default appReducers;
